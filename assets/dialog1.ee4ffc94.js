import{_,f as r,I as c,o as f,c as m,b as a,w as t,e as n,t as p,d as u,r as s}from"./app.b575a985.js";const v=n("\u6253\u5F00\u5BF9\u8BDD\u6846"),g=u("div",null,"Hello World",-1),V=u("div",null,"footer",-1),x=r({__name:"dialog1",setup(B){const e=c(!1);return(b,o)=>{const d=s("el-button"),i=s("ha-dialog");return f(),m("div",null,[a(d,{type:"text",onClick:o[0]||(o[0]=l=>e.value=!0)},{default:t(()=>[v]),_:1}),n(" "+p(e.value)+" ",1),a(i,{modelValue:e.value,"onUpdate:modelValue":o[1]||(o[1]=l=>e.value=l),title:"Demo\u5F39\u7A97","close-on-click-modal":!1},{footer:t(()=>[V]),default:t(()=>[g]),_:1},8,["modelValue"])])}}});var C=_(x,[["__file","dialog1.vue"]]);export{C as default};