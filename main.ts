import fs from'node:fs'
const{MAKEFUN_INPUT_DIR:I,MAKEFUN_OUTPUT_DIR:O}=process.env
let w,D
const F=(a,b,p)=>{let q=[p],r={[p]:''}
for(let h=0;h<q.length;h++)for(let k in D){let t=q[h]+D[k]
if(!a[t]&&!b.includes(t)&&r[t]==null){r[t]=r[q[h]]+'udlr'[k];q.push(t)}}
return r}
const S=(a,g,b,p)=>{let Q=[[b,p,'']],M=new Set([b+'|'+p])
for(let e=0;e<Q.length;e++){let[bx,pp,pa]=Q[e],r=F(a,bx,pp)
for(let j in bx)for(let k in D){let bo=bx[j],t=bo+D[k],s=r[bo-D[k]]
if(s==null||a[t]||bx.includes(t))continue
let N=bx.slice(),y;N[j]=t;N.sort((x,y)=>x-y);y=N+'|'+bo
if(M.has(y))continue
M.add(y);let np=pa+s+'udlr'[k]
if(N.every(x=>g.includes(x)))return np
Q.push([N,bo,np])}}
return''}
const P=s=>{let a=[],g=[],b=[],p=0,i=0;w=s.indexOf('\n');D=[-w,w,-1,1]
for(let c of s){if(c=='\n')continue
a[i]=c=='#'
if('.+*'.includes(c))g.push(i)
if('$*'.includes(c))b.push(i)
if('@+'.includes(c))p=i
i++}
return{a,g,b,p}}
for(let id of fs.readdirSync(I)){let{a,g,b,p}=P(fs.readFileSync(I+'/'+id+'/level.txt','utf8')),h=(p/w)|0,m='',B=b.slice(),G=[],A=a.slice()
A.fill(1,h*w,(h+1)*w)
while(B.length){let bo=B[0],rc=F(A,[],bo),rg=g.filter(x=>rc[x]!=null),rb=B.filter(x=>rc[x]!=null),AA=a.slice()
for(let x of B.concat(G))if(!rb.includes(x))AA[x]=1
let s=S(AA,rg,rb,p)
m+=s
for(let c of s)p+=D['udlr'.indexOf(c)]
G.push(...rg)
B=B.filter(x=>!rb.includes(x))}
let d=O+'/'+id;fs.mkdirSync(d,{recursive:true});fs.writeFileSync(d+'/solution.txt',m+'\n')}
