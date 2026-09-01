const defaults = {
  heroTitle:"Vieta, kur<br><span>uzmirdzēt.</span>",
  heroText:"Profesionāla deju vide Jūrmalā, kur iedvesmoties, attīstīties un sasniegt rezultātus.",
  aboutTitle:"Profesionāla vide.<br>Spēcīga komanda.<br><span class=\"gold\">Ambīcijas.</span>",
  aboutText:"SPARK tika izveidota 2025. gada janvārī ar jaunu skatījumu uz deju un mērķi veidot vidi, kurā aug nākamās paaudzes augsta līmeņa dejotāji.",
  paulaText:"Paula ikdienā ir deju pasniedzēja, kas strādā ar pirmsskolas, skolas vecuma bērniem, kā arī pieaugušajiem.",
  heroVideo:"/assets/deju studija jurmalā - spark (2).mp4",
  rentalText:"SPARK studijas telpa pieejama nodarbībām, privātiem treniņiem, fotosesijām, filmēšanām un citiem projektiem.",
  rentalPrice:"14 €/h",
  rentalTimes:"",
  contact:{address:"Jomas iela 28, Jūrmala",email:"spark.studija@gmail.com",phone:"28628004"},
  socials:{instagram:"https://www.instagram.com/spark.studija/",facebook:"https://www.facebook.com/p/Studija-SPARK-61576203502089/",youtube:"",google:""},
  trainers:[
    {name:"Paula Kukute",role:"Studijas vadītāja · trenere",photo:"/assets/Deju-trenere-Paula-Kukute.jpg",bio:"Paula ikdienā ir deju pasniedzēja, kas strādā ar pirmsskolas, skolas vecuma bērniem, kā arī pieaugušajiem. Savas deju gaitas Paula uzsāka jau 5 gadu vecumā, ir vairākkārtēja Latvijas čempione, Eiropas kausa fināliste Latīņamerikas dejās un ir piedalījusies šovā “Dejo ar Zvaigzni”. Šobrīd Paula vada deju nodarbības un ir sacensību tiesnese.",social:""},
    {name:"Ričards Krīviņš",role:"Treneris · sporta dejas",photo:"",bio:"Latvijas augsta līmeņa sporta deju dejotājs un treneris. Ričards Krīviņš ir Latvijas čempionāta un Eiropas Youth Standard līmeņa čempions ar starptautisku sacensību pieredzi.",social:""},
    {name:"Annija Tkačenko",role:"Trenere · horeogrāfe",photo:"",bio:"Annija jau 6 gadus trenējas un dejo Studio Space, kā arī strādā ar dejotājiem un horeogrāfiju. Viņas specializācija — mūsdienīgs skatuves kustības un komerciālās dejas virziens.",social:""},
    {name:"Armands",role:"Treneris · sporta dejas",photo:"",bio:"Profesionāls dejotājs un treneris, vairākkārtējs Latvijas čempions. Pieredzi papildinājis arī Lietuvā un strādā ar bērniem.",social:""}
  ],
  classes:[
    {title:"Sporta dejas bērniem",tag:"4–12 gadi",price:"",text:"Sporta deju pamati, stāja, koordinācija, ritma izjūta un iespēja augt līdz sacensību līmenim."},
    {title:"LatinFemme",tag:"Sievietēm",price:"",text:"Latīņamerikas ritmi, plastiskums, sievišķība, pašapziņa un horeogrāfija. Piemērots arī no 0."},
    {title:"Deju vakari & pieaugušie",tag:"Pieaugušajiem",price:"",text:"Balles dejas pāriem, grupu un individuālās nodarbības dažādiem līmeņiem."},
    {title:"Kāzu pirmā deja",tag:"Pāriem",price:"1× 50€ · 4× 180€ · 6× 250€ · 8× 305€",text:"Individuāla pirmās dejas iestudēšana, dziesmas pielāgošana un unikāla horeogrāfija."},
    {title:"Individuālās nodarbības",tag:"Individuāli",price:"",text:"Sporta dejas, LatinFemme un kāzu deja ar profesionālu treneri."}
  ],
  gallery:[
    "/assets/deju studija jurmalā - spark (13).jpeg",
    "/assets/deju studija jurmalā - spark (14).jpeg",
    "/assets/deju studija jurmalā - spark (18).jpeg",
    "/assets/deju studija jurmalā - spark (19).jpeg",
    "/assets/deju studija jurmalā - spark (20).jpeg",
    "/assets/deju studija jurmalā - spark (9).jpeg"
  ]
};
async function ensure(env){
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS content (key TEXT PRIMARY KEY, value TEXT NOT NULL)`).run();
}
export async function onRequestGet({env}) {
  await ensure(env);
  const r=await env.DB.prepare(`SELECT key,value FROM content`).all();
  const data={...defaults};
  for(const row of (r.results||[])){try{data[row.key]=JSON.parse(row.value)}catch{data[row.key]=row.value}}
  return Response.json(data);
}
export async function onRequestPost({request,env}){
  await ensure(env);
  const body=await request.json();
  const allowed=["heroTitle","heroText","aboutTitle","aboutText","paulaText","heroVideo","rentalText","rentalPrice","rentalTimes","contact","socials","trainers","classes","gallery"];
  for(const key of allowed){
    if(body[key]===undefined) continue;
    await env.DB.prepare(`INSERT INTO content(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`).bind(key,JSON.stringify(body[key])).run();
  }
  return Response.json({ok:true});
}
