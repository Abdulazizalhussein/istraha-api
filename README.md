# istraha-api

## Deploy to Vercel (2 minutes)

1. Install Vercel CLI:
   npm i -g vercel

2. Deploy:
   cd istraha-api
   vercel --yes

3. Add KV Store:
   - Go to vercel.com → your project → Storage → Create KV Store → name it "istraha-kv"
   - Click "Connect" to link it to your project

4. Redeploy:
   vercel --prod

5. Copy your API URL (e.g. https://istraha-api-xxx.vercel.app)
