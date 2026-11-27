'use strict';
const D=window.AtlasData, E=window.AtlasEngine, $=id=>document.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const time=m=>m==null?'—':String(Math.floor(Math.round(m)/60)%24).padStart(2,'0')+':'+String(Math.round(m)%60).padStart(2,'0');
const baseline=E.run('keep'), agent=E.run('agent'), names={keep:'Keep the bank',spread:'Spread arrivals',custom:'Custom plan'};
let mode='replay', strategy='keep', offsets={}, result=baseline, timepoint=D.start, tick=null, zoom=1, chosen=false, selected=baseline.rows[0].id;
const button=(id,label,style='action')=>'<button id="'+id+'" class="'+style+'">'+label+'</button>';
function bind(id,fn){$(id)?.addEventListener('click',fn)}
function stop(){clearInterval(tick);tick=null;$('play').textContent='▶';$('play').setAttribute('aria-label','Play replay')}
function openSheet(title,kicker,html){
 stop();$('modalTitle').textContent=title;$('modalKicker').textContent=kicker;$('modalBody').innerHTML=html;
 if(!$('modal').open)$('modal').showModal();
}
function traffic(){
 const active=result.rows.filter(r=>r.landed>=timepoint && r.planned-12<=timepoint).slice(0,5);
 let layer=$('traffic');
 if(!layer){layer=document.createElement('div');layer.id='traffic';$('board').append(layer)}
 layer.replaceChildren();
 for(const [i,r] of active.entries()){
  const fraction=Math.max(0,Math.min(1,(timepoint-(r.planned-12))/Math.max(1,r.landed-(r.planned-12))));
  const marker=document.createElement('button');
  marker.className='aircraftDot'; marker.textContent='✈';marker.title=r.number+' · '+r.origin+' to Newark';
  marker.setAttribute('aria-label',marker.title);marker.style.left=(76-32*fraction)+'%';
  marker.style.top=(29+25*fraction+i*2.1)+'%';marker.onclick=()=>aircraft(r.id);layer.append(marker);
 }
 $('plane').hidden=active.length>0;
}
function metrics(){
 traffic();
 $('clock').textContent=time(timepoint)+' ET';$('scrub').value=timepoint;$('arrived').textContent=result.arrivedAt(timepoint);$('queued').textContent=result.queueAt(timepoint);
}
function card(){
 const hubMode=mode==='atlas';
 $('replayTab').classList.toggle('current',!hubMode);$('atlasTab').classList.toggle('current',hubMode);
 for(const [id,active] of [['replayTab',!hubMode],['atlasTab',hubMode]])$(id).setAttribute('aria-pressed',active);
 $('card').innerHTML=hubMode?
 '<span class="tag">AIRPORT DOSSIER</span><h1>Newark Liberty</h1><p class="date">EWR · New Jersey</p><div class="divider"></div><p class="brief">Explore the arrival bank and follow an aircraft to its next city.</p>'+button('realTail','Follow JetBlue N554JB')+button('browse','Explore scenario flights','textbtn')+' · '+button('yieldBtn','Inspect airport throughput','textbtn')+' · '+button('resume','Open the episode','textbtn'):
 '<span class="tag">PLAYABLE HISTORY</span><h1>The Newark Turn</h1><p class="date">Monday, June 2, 2025</p><div class="divider"></div>'+
 (chosen?'<p class="brief">Your plan <b>'+esc(names[strategy])+'</b></p><p class="sub">'+result.totalDelay+' modeled delay minutes · '+result.missedTurns+' late onward legs</p><div class="pair">'+button('compare','Compare plans')+button('edit','Edit flights','alt')+'</div>'+button('reset','Start over','textbtn'):
 '<p class="brief">The runway reopened for departures. You have <b>28 arrivals an hour.</b> How will you handle the afternoon bank?</p><div class="pair">'+button('keep','Keep the bank')+button('spread','Spread arrivals','alt')+'</div>'+button('edit','Plan flight by flight','textbtn'));
 bind('realTail',recordedTail);bind('yieldBtn',throughput);bind('keep',()=>choose('keep'));bind('spread',()=>choose('spread'));bind('compare',comparison);bind('edit',planner);bind('browse',()=>aircraft(selected));bind('resume',()=>switchMode('replay'));bind('reset',()=>{choose('keep',false);chosen=false;timepoint=D.start;metrics();card()});
}
function switchMode(value){mode=value;card()}
function choose(value,show=true){stop();strategy=value;result=E.run(strategy,offsets);chosen=true;mode='replay';card();metrics();if(show)comparison()}
function comparison(){
 const runs=[['Unchanged bank',baseline],['Your plan',result],['Planner agent',agent]];
 const delta=result.totalDelay-baseline.totalDelay;
 const affected=result.rows.map(row=>({row,diff:agent.rows.find(a=>a.id===row.id).nextDelay-row.nextDelay})).sort((a,b)=>Math.abs(b.diff)-Math.abs(a.diff))[0];
 openSheet('After the turn','PLAN COMPARISON','<p>Your <strong>'+esc(names[strategy])+'</strong> plan produces <strong class="winner">'+Math.abs(delta)+(delta===0?' minutes of change':delta<0?' fewer delay minutes':' extra delay minutes')+'</strong> against the unchanged bank.</p><div class="scrolltable"><table><thead><tr><th>Plan</th><th>Delay min</th><th>Late onward legs</th><th>Peak queue</th></tr></thead><tbody>'+runs.map(([label,r])=>'<tr><td>'+label+'</td><td>'+r.totalDelay+'</td><td>'+r.missedTurns+'</td><td>'+r.peakQueue+'</td></tr>').join('')+'</tbody></table></div><p class="note">All three plans use the same 31 recorded arrivals and 55-minute modeled turns. The planner agent prioritizes late onward legs, then delay minutes.</p><div class="rowbtns">'+button('review','Inspect flights','alt')+button('watch','Watch your replay')+'</div>'+button('history','Reveal the historical record','textbtn'));
 if(affected&&affected.diff!==0){
 const box=document.createElement('div');box.className='divider';$('modalBody').append(box);
 const link=document.createElement('button');link.className='textbtn';link.textContent='Trace '+affected.row.number+' · '+affected.row.origin+' to EWR to '+affected.row.nextDest+' ('+Math.abs(affected.diff)+' min difference on the onward leg)';link.onclick=()=>aircraft(affected.row.id);$('modalBody').append(link);
 }
 bind('history',historySheet);
 bind('review',planner);bind('watch',()=>{$('modal').close();timepoint=D.start;start()});
}
function aircraft(id){
 selected=id;const r=result.rows.find(f=>f.id===id)??result.rows[0];const hasNext=!!r.nextDest;
 openSheet('Aircraft rotation','FLIGHT EXPLORER','<label for="pick">Choose a flight</label> <select id="pick" class="flightpick">'+result.rows.map(f=>'<option value="'+esc(f.id)+'" '+(f.id===r.id?'selected':'')+'>'+esc(f.number)+' · '+esc(f.origin)+' · '+time(f.scheduled)+'</option>').join('')+'</select><div class="rotation"><b>'+esc(r.origin)+'</b><i></i><b>EWR</b>'+(hasNext?'<i></i><b>'+esc(r.nextDest)+'</b>':'')+'</div><p class="sub">'+esc(r.number)+' · Aircraft '+esc(r.tail||'unavailable')+'</p><div class="divider"></div><div class="statline"><span>Scheduled arrival</span><strong>'+time(r.scheduled)+' ET</strong></div><div class="statline"><span>Modeled arrival</span><strong>'+time(r.landed)+' ET</strong></div>'+(r.actual!=null?'<div class="statline"><span>Recorded arrival</span><strong>'+time(r.actual)+' ET</strong></div>':'')+(hasNext?'<div class="statline"><span>Onward departure to '+esc(r.nextDest)+'</span><strong>'+time(r.nextScheduled)+' ET</strong></div><div class="statline"><span>Modeled onward delay</span><strong>'+r.nextDelay+' min</strong></div>':'<p class="note">No onward leg in this episode.</p>')+button('adjust','Adjust this flight','alt'));
 $('pick').onchange=e=>aircraft(e.target.value);bind('adjust',()=>{planner();$('shift-'+r.id)?.focus()});
}
function planner(){
 const draft=Object.fromEntries(result.rows.map(r=>[r.id,r.offset||0]));
 openSheet('Plan the arrival bank','FLIGHT PLANNER','<p>Move an arrival later to give another aircraft the earlier slot. Apply the changes to score your schedule.</p><div class="scrolltable"><table><thead><tr><th>Flight</th><th>From</th><th>Scheduled ET</th><th>Next city</th><th>Shift</th></tr></thead><tbody>'+result.rows.map(r=>'<tr><td>'+esc(r.number)+'</td><td>'+esc(r.origin)+'</td><td>'+time(r.scheduled)+'</td><td>'+esc(r.nextDest||'—')+'</td><td><select id="shift-'+esc(r.id)+'" data-flight="'+esc(r.id)+'" aria-label="Shift '+esc(r.number)+'">'+[...new Set([0,5,10,15,20,25,30,draft[r.id]])].sort((a,b)=>a-b).map(v=>'<option value="'+v+'" '+(draft[r.id]===v?'selected':'')+'>+'+v+' min</option>').join('')+'</select></td></tr>').join('')+'</tbody></table></div>'+button('apply','Apply my schedule'));
 $('modalBody').querySelectorAll('select').forEach(el=>el.onchange=()=>{draft[el.dataset.flight]=Number(el.value)});
 bind('apply',()=>{offsets=draft;choose('custom')});
}
function recordedTail(){
 const legs=[
 ['B6306','FLL','EWR','06:10 EDT','09:56 EDT'],
 ['B6127','EWR','MCO','10:00 EDT','12:32 EDT'],
 ['B61084','MCO','JFK','14:25 EDT','17:27 EDT'],
 ['B6135','JFK','PHX','17:30 EDT','21:45 MST']
 ];
 openSheet('One aircraft, four legs','RECORDED ROTATION · JUNE 2','<p>JetBlue Airbus A320 <strong>N554JB</strong> linked Fort Lauderdale, Newark, Orlando, New York and Phoenix on the day Newark reopened its runway for departures.</p><div class="scrolltable"><table><thead><tr><th>Flight</th><th>From</th><th>To</th><th>Listed departure</th><th>Listed arrival</th></tr></thead><tbody>'+legs.map((leg,i)=>'<tr><td><a target="_blank" rel="noopener" href="https://planefinder.net/data/flight/'+leg[0]+'/history/5-'+['20343156','20371367','20401504','20421137'][i]+'">'+leg[0]+'</a></td>'+leg.slice(1).map(cell=>'<td>'+cell+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><p class="note">These are the local times shown in the tracking archive. They are unsuitable for calculating actual gate turns.</p><a href="https://planefinder.net/data/aircraft/N554JB/page/63" target="_blank" rel="noopener">View aircraft history</a>');
}
function throughput(){
 const bins=[];
 for(let t=D.start;t<D.end;t+=15){
  const demand=result.rows.filter(r=>r.planned>=t&&r.planned<t+15).length;
  const served=result.rows.filter(r=>r.landed>=t&&r.landed<t+15).length;
  if(demand||served)bins.push({t,demand,served});
 }
 openSheet('Airport throughput','EWR · ARRIVAL BANK','<p>Compare planned and modeled arrivals in each quarter hour of the episode. Select an interval to inspect the map at that time.</p><table><thead><tr><th>Local time</th><th>Planned</th><th>Modeled arrivals</th></tr></thead><tbody>'+bins.map(b=>'<tr><td><button data-at="'+b.t+'">'+time(b.t)+' ET</button></td><td>'+b.demand+'</td><td>'+b.served+'</td></tr>').join('')+'</tbody></table>');
 $('modalBody').querySelectorAll('[data-at]').forEach(b=>b.onclick=()=>{timepoint=Number(b.dataset.at);$('modal').close();metrics()});
}
function historySheet(){
 const historical=window.AtlasHistory;
 const actuals=historical?.flights||result.rows.filter(r=>Number.isFinite(r.actual));
 const label=historical?'BTS gate arrivals · Eastern time':'Recorded flight outcomes';
 openSheet('What actually happened','HISTORICAL RECORD','<h3>May 20, 2025</h3><p>The FAA limited Newark to 28 arrivals and 28 departures an hour during construction.</p><h3>June 2, 2025</h3><p>The rebuilt runway returned to departure service first. Arrival capacity stayed at 28 an hour pending navigation-aid checks. The FAA expected 34 an hour after those checks.</p>'+(actuals.length?'<h3>'+label+'</h3><table><thead><tr><th>Flight</th><th>From</th><th>Scheduled ET</th><th>Observed ET</th></tr></thead><tbody>'+actuals.map(r=>'<tr><td>'+esc(r.number)+'</td><td>'+esc(r.origin)+'</td><td>'+time(r.scheduled)+'</td><td>'+time(r.actual)+'</td></tr>').join('')+'</tbody></table>':'<p class="note">Flight outcomes in this exercise are modeled. The historical record above covers the FAA constraints.</p>')+'<h3>Follow N69840</h3><p>On June 2, Plane Finder lists this Boeing 737 on UA2691 from Chicago to Newark, then later on UA546 from Newark to Chicago. These two sightings establish a same-day aircraft link. Intervening legs are unknown.</p><p class="note"><a href="https://planefinder.net/data/flight/UA2691/page/8" target="_blank" rel="noopener">UA2691 record</a> · <a href="https://planefinder.net/data/flight/UA546/page/17" target="_blank" rel="noopener">UA546 record</a></p><a href="https://www.faa.gov/newsroom/faa-statements-newark-liberty-international-airport" target="_blank" rel="noopener">Read the FAA statements</a><div>'+button('backScores','Return to comparison','alt')+'</div>');
 bind('backScores',comparison);
}
function notes(){
 const sources=(D.sources||[]).map(s=>typeof s==='string'?esc(s):'<a href="'+esc(s.url||s.href)+'" target="_blank" rel="noopener">'+esc(s.label||s.title||s.name||s.url)+'</a>').join(' · ');
 const info=(Array.isArray(D.notes)?D.notes:[D.notes]).filter(Boolean).map(s=>'<p class="note">'+esc(s)+'</p>').join('');
 openSheet('Field notes','SOURCES & METHOD','<h3>The historical constraint</h3><p>On June 2, 2025, the FAA reported that Newark runway 4L/22R could handle departures while navigation-aid checks continued. The airport’s maximum arrival rate remained 28 per hour, with 34 expected after checks.</p><h3>The replay model</h3>'+info+'<p class="note">The board is an illustrated Newark landscape. Clock times are local to Newark.</p><h3>Source material</h3><p>'+sources+'</p>');
}
function start(){if(tick){stop();return}if(timepoint>=D.end)timepoint=D.start;metrics();$('play').textContent='Ⅱ';$('play').setAttribute('aria-label','Pause replay');tick=setInterval(()=>{timepoint=Math.min(D.end,timepoint+1);metrics();if(timepoint>=D.end)stop()},180)}
function setZoom(value){zoom=Math.max(1,Math.min(1.6,Math.round(value*100)/100));$('board').style.transform='scale('+zoom+')';$('zoomIn').disabled=zoom>=1.6;$('zoomOut').disabled=zoom<=1}
$('scrub').min=D.start;$('scrub').max=D.end;$('scrub').oninput=e=>{stop();timepoint=Number(e.target.value);metrics()};
$('ticks').innerHTML=Array.from({length:5},(_,i)=>'<span>'+time(D.start+(D.end-D.start)*i/4)+'</span>').join('');
bind('play',start);bind('sourceBtn',notes);bind('close',()=>$('modal').close());$('modal').onclick=e=>{if(e.target===$('modal'))$('modal').close()};
bind('atlasTab',()=>switchMode('atlas'));bind('replayTab',()=>switchMode('replay'));bind('hub',()=>{switchMode('atlas');aircraft(selected)});bind('runway',notes);
bind('plane',()=>aircraft((result.rows.find(r=>r.landed>=timepoint)||result.rows.at(-1)).id));bind('zoomIn',()=>setZoom(zoom+.2));bind('zoomOut',()=>setZoom(zoom-.2));bind('labels',()=>{$('labels').setAttribute('aria-pressed',String(!$('board').classList.toggle('hidepins')))});$('labels').setAttribute('aria-pressed','true');
setZoom(1);metrics();card();
