(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"2yxt":function(e,t,n){"use strict";n.r(t),n.d(t,"ChatModule",(function(){return g}));var r=n("ofXK"),o=n("fXoL"),l=n("TyVa"),i=n("yFR0"),s=n("JqCM"),a=n("3Pt+");function m(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"option",24),o["\u0275\u0275text"](1),o["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;o["\u0275\u0275property"]("value",e.name),o["\u0275\u0275advance"](1),o["\u0275\u0275textInterpolate"](e.name)}}function c(e,t){if(1&e&&(o["\u0275\u0275elementStart"](0,"div"),o["\u0275\u0275elementStart"](1,"span"),o["\u0275\u0275elementStart"](2,"strong"),o["\u0275\u0275text"](3),o["\u0275\u0275elementEnd"](),o["\u0275\u0275text"](4),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;o["\u0275\u0275advance"](3),o["\u0275\u0275textInterpolate1"]("",e.user," : "),o["\u0275\u0275advance"](1),o["\u0275\u0275textInterpolate1"](" ",e.message,"")}}let d=(()=>{class e{constructor(e,t,n){this.postService=e,this.chatService=t,this.spinner=n,this.userName=[],this.messageList=[],this.subscription=[],this.room=[{name:"Delux"},{name:"Private"},{name:"Hr"}],this.chatService.newUserJoin().subscribe(e=>{this.messageList.push(e)},e=>{}),this.chatService.userLeft().subscribe(e=>{this.messageList.push(e)},e=>{}),this.chatService.onMessageSend().subscribe(e=>{this.messageList.push(e)},e=>{})}ngOnInit(){this.spinner.show(),setTimeout(()=>{this.spinner.hide()},1e3),this.subscription.push(this.chatService.getName().subscribe(e=>{this.userName=e.data}))}joinRoom(){this.chatService.joinRoom({user:this.name,room:this.user})}leaveRoom(){this.chatService.leaveRoom({user:this.name,room:this.user})}sendMessage(){this.chatService.sendMessage({user:this.name,room:this.user,message:this.message})}ngOnDestroy(){this.subscription.forEach(e=>e.unsubscribe())}}return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275directiveInject"](l.a),o["\u0275\u0275directiveInject"](i.a),o["\u0275\u0275directiveInject"](s.c))},e.\u0275cmp=o["\u0275\u0275defineComponent"]({type:e,selectors:[["app-chat"]],decls:41,vars:6,consts:[[1,"container-fluid","ml-3"],[1,"row"],[1,"col-sm-5"],[1,"form-group"],["for","username"],["name","roomInput",1,"form-control",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["for","roomInput"],["name","roomInput","id","roomInput",1,"form-control",3,"ngModel","ngModelChange"],["value","hr"],["value","develop"],["value","review"],[1,"col","sm-2","mt-2"],[1,"pull-right",2,"margin-top","19px"],["type","button",1,"btn","btn-primary",3,"click"],["type","button",1,"btn","btn-danger","ml-2",3,"click"],[1,"well",2,"height","200px","padding","15px"],[4,"ngFor","ngForOf"],[1,"col-sm-10"],["type","text",1,"form-control",3,"ngModel","ngModelChange"],[1,"col-sm-2"],["type","button",1,"btn","btn-success","pull-right",3,"click"],["bdColor","rgba(0, 0, 0, 0.8)","size","medium","color","#fff","type","ball-spin-clockwise",3,"fullScreen"],[2,"color","white"],[3,"value"]],template:function(e,t){1&e&&(o["\u0275\u0275elementStart"](0,"div",0),o["\u0275\u0275elementStart"](1,"div",1),o["\u0275\u0275elementStart"](2,"h2"),o["\u0275\u0275text"](3,"Employee Chat "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](4,"hr"),o["\u0275\u0275elementStart"](5,"div",1),o["\u0275\u0275elementStart"](6,"div",2),o["\u0275\u0275elementStart"](7,"div",3),o["\u0275\u0275elementStart"](8,"label",4),o["\u0275\u0275text"](9,"Username"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](10,"select",5),o["\u0275\u0275listener"]("ngModelChange",(function(e){return t.name=e})),o["\u0275\u0275template"](11,m,2,2,"option",6),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](12,"div",2),o["\u0275\u0275elementStart"](13,"label",7),o["\u0275\u0275text"](14,"Choose room"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](15,"select",8),o["\u0275\u0275listener"]("ngModelChange",(function(e){return t.user=e})),o["\u0275\u0275elementStart"](16,"option",9),o["\u0275\u0275text"](17,"Hr"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](18,"option",10),o["\u0275\u0275text"](19,"Development Group"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](20,"option",11),o["\u0275\u0275text"](21,"Review"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](22,"div",12),o["\u0275\u0275elementStart"](23,"div",13),o["\u0275\u0275elementStart"](24,"button",14),o["\u0275\u0275listener"]("click",(function(){return t.joinRoom()})),o["\u0275\u0275text"](25,"Join"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](26,"button",15),o["\u0275\u0275listener"]("click",(function(){return t.leaveRoom()})),o["\u0275\u0275text"](27,"Leave"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](28,"div",1),o["\u0275\u0275elementStart"](29,"div",16),o["\u0275\u0275template"](30,c,5,2,"div",17),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275element"](31,"br"),o["\u0275\u0275elementStart"](32,"div",1),o["\u0275\u0275elementStart"](33,"div",18),o["\u0275\u0275elementStart"](34,"input",19),o["\u0275\u0275listener"]("ngModelChange",(function(e){return t.message=e})),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](35,"div",20),o["\u0275\u0275elementStart"](36,"button",21),o["\u0275\u0275listener"]("click",(function(){return t.sendMessage()})),o["\u0275\u0275text"](37,"Send"),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementStart"](38,"ngx-spinner",22),o["\u0275\u0275elementStart"](39,"p",23),o["\u0275\u0275text"](40," Loading... "),o["\u0275\u0275elementEnd"](),o["\u0275\u0275elementEnd"]()),2&e&&(o["\u0275\u0275advance"](10),o["\u0275\u0275property"]("ngModel",t.name),o["\u0275\u0275advance"](1),o["\u0275\u0275property"]("ngForOf",t.userName),o["\u0275\u0275advance"](4),o["\u0275\u0275property"]("ngModel",t.user),o["\u0275\u0275advance"](15),o["\u0275\u0275property"]("ngForOf",t.messageList),o["\u0275\u0275advance"](4),o["\u0275\u0275property"]("ngModel",t.message),o["\u0275\u0275advance"](4),o["\u0275\u0275property"]("fullScreen",!0))},directives:[a.SelectControlValueAccessor,a.NgControlStatus,a.NgModel,r.NgForOf,a.NgSelectOption,a["\u0275angular_packages_forms_forms_x"],a.DefaultValueAccessor,s.a],styles:[".upper-div[_ngcontent-%COMP%]{justify-content:space-around}.lower-div[_ngcontent-%COMP%], .upper-div[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center}.lower-div[_ngcontent-%COMP%]{justify-content:space-evenly}.textarea[_ngcontent-%COMP%]{width:500px}"]}),e})();var u=n("tyNb");const p=[{path:"",component:d}];let g=(()=>{class e{}return e.\u0275mod=o["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=o["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[r.CommonModule,a.FormsModule,u.g.forChild(p),s.b]]}),e})()}}]);