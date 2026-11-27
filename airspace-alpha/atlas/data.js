(() => {
 const h=window.AtlasHistory;
 const turn=55;
 const latest=Math.max(...h.flights.map(f=>Math.max(f.scheduled+40,f.actual??0)));
 window.AtlasData={
  date:h.date,flights:h.flights,cap:28,minimumTurn:turn,start:h.start-10,end:Math.ceil(latest/15)*15,
  sources:[h.source,{title:'FAA Newark statements',url:'https://www.faa.gov/newsroom/faa-statements-newark-liberty-international-airport'},{title:'JetBlue N554JB aircraft history',url:'https://planefinder.net/data/aircraft/N554JB/page/63'}],
  notes:[
   h.flights.length+' completed domestic arrivals scheduled at Newark from 14:00 to 16:00 ET come from the June 2025 BTS archive. '+h.flights.filter(f=>f.nextDest).length+' have an identified onward departure on the same aircraft.',
   'The FAA limit of 28 arrivals per hour applies to the whole airport. This exercise gives the selected domestic flights evenly spaced slots at that rate. Other traffic, taxi time, gates, crews, weather and passenger connections are omitted. The result is a scheduling exercise, not a reconstruction of the actual runway queue.',
   'Scheduled gate arrivals stand in for demand at the runway. Each linked departure requires a modeled '+turn+'-minute turn. Scores add arrival lateness against the original schedule and any onward departure lateness. Recorded times are gate observations and are hidden from the planner.',
   'The planner agent tries 0, 5, 10, 15 and 20 minute shifts over two passes. It prioritizes fewer late onward legs, then fewer delay minutes, then a smaller peak queue.'
  ]
 };
})();
