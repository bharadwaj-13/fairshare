const isoDate=daysAgo=>{
 const date=new Date();
 date.setHours(12,0,0,0);
 date.setDate(date.getDate()-daysAgo);
 return date.toISOString().slice(0,10);
};

const expense=(id,description,amount,groupId,paidBy,splits,daysAgo,category,notes='',comments=[])=>({
 id,description,amount,groupId,paidBy,splits,date:isoDate(daysAgo),currency:'INR',category,notes,comments
});

export function createDemoState(owner){
 const me={...owner,name:owner.name&&owner.name!=='You'?owner.name:'Bharadwaj',color:owner.color||'purple'};
 const maya={id:'demo-maya',name:'Maya Kapoor',email:'',color:'purple'};
 const arjun={id:'demo-arjun',name:'Arjun Mehta',email:'',color:'purple'};
 const zoya={id:'demo-zoya',name:'Zoya Khan',email:'',color:'purple'};
 const now=new Date().toISOString();
 return {
  people:[me,maya,arjun,zoya],
  groups:[
   {id:'demo-goa',name:'Goa Weekend',members:[me.id,maya.id,arjun.id,zoya.id],emoji:'',type:'Group',color:'plain',description:'A four-day beach trip with every shared cost in one place.'},
   {id:'demo-home',name:'Apartment 4B',members:[me.id,maya.id,arjun.id],emoji:'',type:'Group',color:'plain',description:'Monthly household bills and shared supplies.'},
   {id:'demo-lunch',name:'Team Lunches',members:[me.id,maya.id,zoya.id],emoji:'',type:'Group',color:'plain',description:'Lunches and coffee with the design team.'}
  ],
  expenses:[
   expense('demo-e10','Coffee run',105000,'demo-lunch',zoya.id,{[me.id]:35000,[maya.id]:35000,[zoya.id]:35000},1,'Food & drinks','Coffee before the client review.'),
   expense('demo-e9','Team lunch',324000,'demo-lunch',me.id,{[me.id]:108000,[maya.id]:108000,[zoya.id]:108000},2,'Food & drinks','Friday lunch after the sprint demo.',[{id:'demo-c2',text:'I have added dessert to my share.',by:maya.id,date:isoDate(2)}]),
   expense('demo-e8','Water bill',73500,'demo-home',me.id,{[me.id]:24500,[maya.id]:24500,[arjun.id]:24500},4,'Utilities'),
   expense('demo-e7','Cleaning supplies',98000,'demo-home',arjun.id,{[me.id]:32700,[maya.id]:32700,[arjun.id]:32600},6,'Shopping','Kitchen and bathroom supplies.'),
   expense('demo-e6','Internet bill',149900,'demo-home',me.id,{[me.id]:50000,[maya.id]:50000,[arjun.id]:49900},9,'Utilities','October fibre connection.'),
   expense('demo-e5','October groceries',486000,'demo-home',maya.id,{[me.id]:162000,[maya.id]:162000,[arjun.id]:162000},12,'Groceries','Staples for the apartment.'),
   expense('demo-e4','Fuel and tolls',245000,'demo-goa',zoya.id,{[me.id]:61300,[maya.id]:61300,[arjun.id]:61200,[zoya.id]:61200},17,'Transport'),
   expense('demo-e3','Sunset dinner',675000,'demo-goa',maya.id,{[me.id]:170000,[maya.id]:165000,[arjun.id]:170000,[zoya.id]:170000},18,'Food & drinks','Custom split after removing Maya’s drinks.',[{id:'demo-c1',text:'Split updated — thanks!',by:arjun.id,date:isoDate(18)}]),
   expense('demo-e2','Rental scooters',360000,'demo-goa',arjun.id,{[me.id]:90000,[maya.id]:90000,[arjun.id]:90000,[zoya.id]:90000},19,'Transport'),
   expense('demo-e1','Beach house',1840000,'demo-goa',me.id,{[me.id]:460000,[maya.id]:460000,[arjun.id]:460000,[zoya.id]:460000},24,'Accommodation','Four nights near Anjuna. Deposit included.')
  ],
  settlements:[
   {id:'demo-s1',groupId:'demo-goa',from:maya.id,to:me.id,amount:300000,currency:'INR',date:isoDate(10),method:'UPI'},
   {id:'demo-s2',groupId:'demo-home',from:me.id,to:maya.id,amount:100000,currency:'INR',date:isoDate(5),method:'Bank transfer'}
  ],
  activity:[
   {id:'demo-a1',text:`${me.name} added “Team lunch”`,date:now},
   {id:'demo-a2',text:'Zoya added “Coffee run”',date:now},
   {id:'demo-a3',text:'Maya recorded a payment for Goa Weekend',date:now}
  ]
 };
}
