export async function onRequestGet({env}) {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, message TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`).run();
  const r=await env.DB.prepare(`SELECT * FROM leads ORDER BY id DESC LIMIT 100`).all();
  return Response.json(r.results||[]);
}
export async function onRequestPost({request,env}) {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, message TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`).run();
  const b=await request.json();
  await env.DB.prepare(`INSERT INTO leads(name,email,phone,message) VALUES(?,?,?,?)`).bind(b.name||"",b.email||"",b.phone||"",b.message||"").run();
  return Response.json({ok:true});
}
