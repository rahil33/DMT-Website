# ATLAS — Marketing Agency Website

A fully interactive marketing agency website with smooth animations,
magnetic letter effects, canvas shaders, and Supabase contact form integration.

---

## 📁 Project Structure

```
atlas-website/
├── index.html          ← Main page (all sections)
├── css/
│   └── style.css       ← All styles, variables, animations
├── js/
│   ├── supabase.js     ← Supabase client + saveContact()
│   ├── cursor.js       ← Custom cursor (dot + trailing ring)
│   ├── canvas.js       ← Hero particle canvas + quote wave canvas
│   ├── letters.js      ← Magnetic jiggle/bounce/spin hero letters
│   ├── scroll.js       ← Nav sticky, reveal on scroll, counters, parallax
│   └── cta.js          ← Contact form validation + Supabase insert
├── assets/             ← Drop logo, images, favicon here
└── README.md           ← This file
```

---

## 🚀 Step 1 — Run Locally

No build step needed. Just open `index.html` in your browser.

```bash
# Option A: double-click index.html in Finder / Explorer

# Option B: use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"

# Option C: Python quick server
cd atlas-website
python3 -m http.server 3000
# then open http://localhost:3000
```

---

## 🗄️ Step 2 — Connect Supabase

### 2a. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) → **New Project**
2. Give it a name (e.g. `atlas-website`), choose a region, set a password
3. Wait ~2 minutes for it to spin up

### 2b. Create the `contacts` table

In your Supabase dashboard → **SQL Editor** → paste and run:

```sql
-- Create contacts table
create table contacts (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table contacts enable row level security;

-- Allow anyone to insert (public contact form)
create policy "Allow public insert"
  on contacts
  for insert
  with check (true);
```

### 2c. Get your API keys

Dashboard → **Settings** → **API**

Copy:
- **Project URL** — looks like `https://abcdefgh.supabase.co`
- **anon / public key** — long JWT string

### 2d. Add keys to the project

Open `js/supabase.js` and replace lines 9–10:

```js
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';  // ← paste here
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';                 // ← paste here
```

Save the file. Now when someone fills the contact form, their email is saved
to your Supabase `contacts` table automatically.

### 2e. Verify it works

1. Open the site → scroll to **Contact** section
2. Type a test email → click **Send It →**
3. Go to Supabase → **Table Editor** → `contacts`
4. You should see the email appear ✓

---

## 🌐 Step 3 — Deploy (Vercel — free)

Vercel deploys a static site in ~30 seconds.

```bash
# Install Vercel CLI
npm install -g vercel

# From your project folder
cd atlas-website
vercel

# Follow prompts:
# → Scope: your account
# → Link to existing project? No
# → Project name: atlas-website
# → Root directory: ./  (just press Enter)
# → Override settings? No

# Done! You'll get a URL like:
# https://atlas-website.vercel.app
```

Every time you push changes, run `vercel --prod` to redeploy.

### Alternative: Netlify drag-and-drop

1. Go to [https://netlify.com](https://netlify.com) → Log in
2. Drag your entire `atlas-website/` folder onto the Netlify dashboard
3. Done — you get a live URL instantly

---

## ✏️ Step 4 — Customise Content

| What to change          | Where                          |
|-------------------------|--------------------------------|
| Hero text (WE MAP etc.) | `js/letters.js` → `lines` array |
| Services, pricing       | `index.html` → sections        |
| Colours / fonts         | `css/style.css` → `:root`      |
| Canvas speed/colours    | `js/canvas.js`                 |
| Logo / favicon          | `assets/` + update `index.html` |
| Footer email            | `index.html` → `<footer>`      |

---

## 🎨 Colour Palette

```css
--black:  #060606   /* background */
--white:  #f4f0e8   /* text */
--gold:   #c9a85c   /* primary accent */
--gold2:  #e8c87a   /* hover gold */
--dim:    #888      /* muted text */
```

---

## 📦 Dependencies

| Library      | How it's loaded          | Used for              |
|--------------|--------------------------|-----------------------|
| Supabase JS  | CDN (auto in supabase.js)| Database / contact form|
| Google Fonts | `<link>` in `<head>`     | Syne + DM Sans fonts  |

No npm, no bundler, no build step required.

---

## 🔒 Security Notes

- The **anon key** is safe to expose in frontend code — it's public by design
- Row Level Security (RLS) ensures visitors can only **insert**, not read/delete data
- Never put your **service_role** key in frontend code

---

## 📬 View Contact Submissions

Supabase Dashboard → **Table Editor** → `contacts`

You can also set up email notifications:
Dashboard → **Database** → **Webhooks** → create a webhook to notify you on insert.

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| Letters not animating | Check browser console for JS errors; ensure `js/letters.js` loads |
| Canvas is black | Resize window to trigger canvas resize event |
| Supabase not saving | Check URL + key in `supabase.js`; check browser console |
| Cursor not showing | `cursor: none` is on `body`; custom cursor needs JS enabled |
| Site looks broken locally | Use Live Server or `python3 -m http.server`, not `file://` |
