@@ .. @@
   async rewrites() {
     return [
       {
         source: '/api/:path*',
-        destination: 'http://localhost:3001/api/:path*',
+        destination: process.env.API_URL || 'http://localhost:3001/api/:path*',
       },
       {
         source: '/static/:path*',
-        destination: 'http://localhost:3001/static/:path*',
+        destination: process.env.API_URL?.replace('/api', '') || 'http://localhost:3001/static/:path*',
       }
     ];
   },