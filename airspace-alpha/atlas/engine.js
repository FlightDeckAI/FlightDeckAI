(() => {
 const data=window.AtlasData, separation=60/data.cap;
 function model(offsets={}){
  const pending=data.flights.map(f=>{
   const offset=Math.max(0,Math.min(30,Math.round(Number(offsets[f.id])||0)));
   return {...f,offset,planned:f.scheduled+offset};
  }).sort((a,b)=>a.planned-b.planned||a.scheduled-b.scheduled||a.id.localeCompare(b.id));
  let nextSlot=-Infinity;
  for(const row of pending){
   row.landed=Math.max(row.planned,nextSlot);nextSlot=row.landed+separation;
   row.delay=Math.max(0,Math.round(row.landed-row.scheduled));
   row.nextDelay=row.nextScheduled==null?0:Math.max(0,Math.round(row.landed+data.minimumTurn-row.nextScheduled));
  }
  const queueAt=t=>pending.filter(r=>r.planned<=t&&r.landed>t).length;
  return {rows:pending,totalDelay:pending.reduce((n,r)=>n+r.delay+r.nextDelay,0),missedTurns:pending.filter(r=>r.nextDelay>0).length,
   peakQueue:Math.max(0,...pending.map(r=>queueAt(r.planned))),queueAt,arrivedAt:t=>pending.filter(r=>r.landed<=t).length};
 }
 function spread(){
  const offsets={};let slot=-Infinity;
  for(const f of [...data.flights].sort((a,b)=>a.scheduled-b.scheduled)){
    slot=Math.max(slot,f.scheduled);offsets[f.id]=Math.min(30,Math.max(0,Math.round(slot-f.scheduled)));slot+=separation;
  }
  return offsets;
 }
 const quality=r=>[r.missedTurns,r.totalDelay,r.peakQueue];
 function better(x,y){const a=quality(x),b=quality(y);for(let i=0;i<a.length;i++){if(a[i]!==b[i])return a[i]<b[i]}return false}
 function plan(){
  const offsets={};let best=model(offsets);
  for(let pass=0;pass<2;pass++){
   for(const f of data.flights){let v=offsets[f.id]||0;
    for(const change of [0,5,10,15,20]){const candidate=model({...offsets,[f.id]:change});if(better(candidate,best)){best=candidate;v=change}}
    offsets[f.id]=v;
   }
  }
  return offsets;
 }
 let agent;
 window.AtlasEngine={run(strategy,customOffsets={}){
   if(strategy==='agent'){agent ||= plan();return model(agent)}
   return model(strategy==='spread'?spread():strategy==='custom'?customOffsets:{});
 }};
})();
