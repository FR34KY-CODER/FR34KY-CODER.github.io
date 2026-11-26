export const extraMovies=[
 ["All the Bright Places","tt3907584","2020","Romantic drama","Two teenagers map the overlooked corners of Indiana as they learn what each has been carrying.","Indiana"],
 ["Avengers: Infinity War","tt4154756","2018","Superhero epic","Allies scattered across Earth and space race to keep the Infinity Stones from Thanos.","Wakanda"],
 ["Superman","tt5950044","2025","Superhero adventure","Clark Kent faces a crisis of public trust while Lex Luthor turns Metropolis against him.","Metropolis"],
 ["Get Out","tt5052448","2017","Psychological horror","A weekend with his girlfriend’s family leaves Chris questioning every encounter.","The Armitage estate"],
 ["The Skin I Live In","tt1189073","2011","Psychological thriller","A plastic surgeon’s experiments draw a captive woman into his private obsession.","El Cigarral"],
 ["The Truman Show","tt0120382","1998","Satirical drama","Small glitches in a picture-perfect seaside town lead Truman to investigate his own life.","Seahaven"],
 ["The Number 23","tt0481369","2007","Mystery thriller","A book about the number 23 begins to read like a record of its reader’s life.","The bookshop"],
 ["Searching","tt7668870","2018","Screenlife thriller","A father searches his missing daughter’s laptop and finds a life he barely recognizes.","Margot’s desktop"],
 ["Kingsman: The Secret Service","tt2802144","2014","Spy action","A London teenager enters an underground intelligence service through a lethal recruitment test.","Savile Row"],
 ["Primer","tt0390384","2004","Science fiction","Two engineers discover that their garage-built device can send its contents back in time.","The garage"],
 ["Project Almanac","tt2436386","2015","Found-footage sci-fi","Friends assemble a time machine from old blueprints and start revising their own recent past.","The basement"],
 ["The Matrix","tt0133093","1999","Cyberpunk sci-fi","A hacker follows a stranger out of the simulated world he has mistaken for reality.","The Nebuchadnezzar"],
];
export const extraSeries=[
 ["Dexter","tt0773262","2006–2013","Crime drama","A Miami blood-spatter analyst hides his own killings behind a meticulously rehearsed routine.","Miami Metro"],
 ["From","tt9813792","2022","Mystery horror","New arrivals find that every road leads back to the same town, and shelter matters after sunset.","The township"],
 ["Dark","tt5753856","2017–2020","Sci-fi mystery","A missing child exposes connections between four families across generations.","Winden"],
 ["Daredevil","tt3322312","2015–2018","Superhero crime drama","Matt Murdock defends Hell’s Kitchen in court by day and on its rooftops by night.","Hell’s Kitchen"],
 ["Loki","tt9140554","2021–2023","Sci-fi adventure","A variant of Loki falls into the custody of the bureaucracy that polices time itself.","The TVA"],
 ["VisionQuest","tt23112594","2026","Marvel series","White Vision’s search for identity continues after the events of WandaVision.","Marvel Television"],
];
export function posterRow([title,id,year,genre,summary,venue]:string[]){return [title,id,id,year,genre,summary,venue];}
