import fs from'node:fs'
const{MAKEFUN_INPUT_DIR:i,MAKEFUN_OUTPUT_DIR:o}=process.env
let w,D
const F=(a,b,p)=>{let q=[p],r={[p]:''}
for(let h=0;h<q.length;h++)for(let k in D){let t=q[h]+D[k]
if(!a[t]&&!b.includes(t)&&r[t]==null){r[t]=r[q[h]]+'udlr'[k];q.push(t)}}
return r}
const S=(a,g,b,p)=>{let Q=[[b,p,'']],M=new Set([b+'|'+p])
for(let e=0;e<Q.length;e++){let[B,P,A]=Q[e],r=F(a,B,P)
for(let j in B)for(let k in D){let o=B[j],t=o+D[k],s=r[o-D[k]]
if(s==null||a[t]||B.includes(t))continue
let N=B.slice();N[j]=t;N.sort((x,y)=>x-y);let y=N+'|'+o
if(M.has(y))continue
M.add(y);let n=A+s+'udlr'[k]
if(N.every(x=>g.includes(x)))return n
Q.push([N,o,n])}}
return''}
for(let d of fs.readdirSync(i)){let s=fs.readFileSync(i+'/'+d+'/level.txt','utf8'),a=[],g=[],b=[],p=0,j=0,m='',h
w=s.indexOf('\n');D=[-w,w,-1,1]
for(let c of s){if(c=='\n')continue;a[j]=c=='#';if('.+*'.includes(c))g.push(j);if('$*'.includes(c))b.push(j);if('@+'.includes(c))p=j;j++}
h=p/w|0;let A=a.slice()
A.fill(1,h*w,h*w+w)
while(b.length){let o=b[0],c=F(A,[],o),rg=g.filter(x=>c[x]!=null),rb=b.filter(x=>c[x]!=null),W=a.slice()
for(let x of b)if(!rb.includes(x))W[x]=1
let t=S(W,rg,rb,p);m+=t
for(let c of t)p+=D['udlr'.indexOf(c)]
for(let x of rg)a[x]=1
b=b.filter(x=>!rb.includes(x))}
let f=o+'/'+d;fs.mkdirSync(f,{recursive:true});fs.writeFileSync(f+'/solution.txt',m+'\n')}
