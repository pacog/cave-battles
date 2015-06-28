!function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/battle-view/tunnel/tunnel.tpl.html",scope:{tunnelInfo:"="},replace:!0}}angular.module("caveBattles.battle-view.tunnel",[]).directive("tunnel",e)}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/battle-view/node/node.tpl.html",scope:{nodeInfo:"="},controller:"NodeController",controllerAs:"vm",bindToController:!0,replace:!0}}angular.module("caveBattles.battle-view.node",["caveBattles.battle-view.node-controller"]).directive("node",e)}(),function(){"use strict";function e(e){function t(t){t.stopPropagation(),r.nodeInfo.canBeReachedBySelectedNode?e.requestNodeForcesToGoToNode(r.nodeInfo):e.requestSelection(r.nodeInfo)}function n(){return r.nodeInfo.partialOwner?100*(1-r.nodeInfo.ownerStrength/r.nodeInfo.DEFAULT_NODE_STRENGTH):100}var r=this;r.nodeClicked=t,r.getTopFill=n}angular.module("caveBattles.battle-view.node-controller",["caveBattles.battle-handler"]).controller("NodeController",e),e.$inject=["BattleHandler"]}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/battle-view/army/army.tpl.html",scope:{armyInfo:"="},replace:!0,controller:"ArmyController",controllerAs:"vm",bindToController:!0}}angular.module("caveBattles.battle-view.army",["caveBattles.battle-view.army-controller"]).directive("army",e)}(),function(){"use strict";function e(){}angular.module("caveBattles.battle-view.army-controller",[]).controller("ArmyController",e)}(),function(){"use strict";function e(e){function t(t){this.ongoingEvents=[],this.scheduledEvents=[],this.scheduledEvents.push(new e({nodes:t.nodes,players:t.players,relatedOngoingEvents:this.ongoingEvents,scheduler:t.scheduler,repeatEvery:t.repeatEvery,scheduledFor:t.scheduledFor}))}var n=function(e){this.init(e)};return n.prototype={init:t},n}angular.module("caveBattles.actions.plan-ia",["caveBattles.actions.plan-ia-scheduled"]).factory("PlanAIAction",e),e.$inject=["PlanAIActionScheduled"]}(),function(){"use strict";function e(e,t,n){function r(t){this.relatedOngoingEvents=t.relatedOngoingEvents,this.scheduler=t.scheduler,this.scheduledFor=t.scheduledFor||e.getTime(),this.repeatEvery=t.repeatEvery}function i(){var r=this;angular.forEach(t.model.players,function(e){if(e.isAI()){var n=e.getAI().getNextAction(e,t.model.nodes);n&&(n.params.scheduler=r.scheduler,r.scheduler.addEvent(n.name,n.params))}}),r.scheduler.addEvent(n.PLAN_AI,{scheduler:r.scheduler,repeatEvery:r.repeatEvery,scheduledFor:e.getTime()+r.repeatEvery})}var o=function(e){this.init(e)};return o.prototype={init:r,execute:i},o}angular.module("caveBattles.actions.plan-ia-scheduled",["caveBattles.utils.timer","caveBattles.battle-model","caveBattles.battle-events"]).factory("PlanAIActionScheduled",e),e.$inject=["Timer","BattleModel","BattleEvents"]}(),function(){"use strict";function e(e,t){function n(n){this.ongoingEvents=[],this.scheduledEvents=[],n.army&&n.army.force&&(this.ongoingEvents.push(new e({army:n.army,destinationNode:n.destinationNode})),this.scheduledEvents.push(new t({army:n.army,destinationNode:n.destinationNode,relatedOngoingEvents:this.ongoingEvents})))}var r=function(e){this.init(e)};return r.prototype={init:n},r}angular.module("caveBattles.actions.move-army",["caveBattles.actions.move-army-ongoing","caveBattles.actions.move-army-scheduled"]).factory("MoveArmyAction",e),e.$inject=["MoveArmyActionOnGoing","MoveArmyActionScheduled"]}(),function(){"use strict";function e(e){function t(t){this.relatedOngoingEvents=t.relatedOngoingEvents,this.army=t.army,this.scheduledFor=e.getTime()+1e3*this.army.timeToGetToDestination(t.destinationNode),this.destinationNode=t.destinationNode}function n(){this.destinationNode.handleArmyArriving(this.army)}var r=function(e){this.init(e)};return r.prototype={init:t,execute:n},r}angular.module("caveBattles.actions.move-army-scheduled",["caveBattles.utils.timer"]).factory("MoveArmyActionScheduled",e),e.$inject=["Timer"]}(),function(){"use strict";function e(e){function t(t){this.timeAdded=e.getTime(),this.army=t.army,this.destinationNode=t.destinationNode,this.progress=t.progress||0}function n(){var t=e.getTime();this.army.updatePosition(t-this.timeAdded,this.destinationNode)}var r=function(e){this.init(e)};return r.prototype={init:t,update:n},r}angular.module("caveBattles.actions.move-army-ongoing",["caveBattles.utils.timer"]).factory("MoveArmyActionOnGoing",e),e.$inject=["Timer"]}(),function(){"use strict";function e(e){function t(t){this.ongoingEvents=[],this.scheduledEvents=[],t.originNode&&t.destinationNode&&this.scheduledEvents.push(new e({originNode:t.originNode,destinationNode:t.destinationNode,scheduler:t.scheduler,relatedOngoingEvents:this.ongoingEvents}))}var n=function(e){this.init(e)};return n.prototype={init:t},n}angular.module("caveBattles.actions.move-army-ia",["caveBattles.actions.move-army-ia-scheduled"]).factory("MoveArmyIAAction",e),e.$inject=["MoveArmyIAActionScheduled"]}(),function(){"use strict";function e(e,t,n){function r(t){this.relatedOngoingEvents=t.relatedOngoingEvents,this.army=t.army,this.scheduledFor=e.getTime(),this.destinationNode=t.destinationNode,this.originNode=t.originNode,this.scheduler=t.scheduler}function i(){var e=n.moveForcesBetweenNodesAndGetRelatedEvent(this.originNode,this.destinationNode);e&&this.scheduler.addEvent(t.MOVE_ARMY,e)}var o=function(e){this.init(e)};return o.prototype={init:r,execute:i},o}angular.module("caveBattles.actions.move-army-ia-scheduled",["caveBattles.utils.timer","caveBattles.battle-events","caveBattles.battle-model"]).factory("MoveArmyIAActionScheduled",e),e.$inject=["Timer","BattleEvents","BattleModel"]}(),function(){"use strict";function e(e){function t(t){this.ongoingEvents=[],this.scheduledEvents=[],this.scheduledEvents.push(new e({relatedOngoingEvents:this.ongoingEvents,scheduler:t.scheduler,repeatEvery:t.repeatEvery,scheduledFor:t.scheduledFor}))}var n=function(e){this.init(e)};return n.prototype={init:t},n}angular.module("caveBattles.actions.fill-nodes",["caveBattles.actions.fill-nodes-scheduled"]).factory("FillNodesAction",e),e.$inject=["FillNodesActionScheduled"]}(),function(){"use strict";function e(e,t,n){function r(t){this.relatedOngoingEvents=t.relatedOngoingEvents,this.scheduler=t.scheduler,this.scheduledFor=t.scheduledFor||e.getTime(),this.repeatEvery=t.repeatEvery}function i(){angular.forEach(t.model.nodes,function(e){e.fillNode()}),this.scheduler.addEvent(n.FILL_NODES,{scheduler:this.scheduler,repeatEvery:this.repeatEvery,scheduledFor:e.getTime()+this.repeatEvery})}var o=function(e){this.init(e)};return o.prototype={init:r,execute:i},o}angular.module("caveBattles.actions.fill-nodes-scheduled",["caveBattles.utils.timer","caveBattles.battle-model","caveBattles.battle-events"]).factory("FillNodesActionScheduled",e),e.$inject=["Timer","BattleModel","BattleEvents"]}(),function(){"use strict";function e(){function e(){r=null}function t(){return r||(new Date).getTime()}function n(e){r=e}var r=null,i={getTime:t,setTime:n,restart:e};return i}angular.module("caveBattles.utils.timer",[]).factory("Timer",e)}(),function(){"use strict";function e(){function e(e){this.orderBy=e&&e.orderBy?e.orderBy:"time",this.firstElement=null,this._currentSize=0}function t(e){if(!this.firstElement)return this.firstElement={element:e,next:null},void this._currentSize++;for(var t=null,n=this.firstElement;n;){if(n.element[this.orderBy]>e[this.orderBy]){var r={element:e,next:n};return t?t.next=r:this.firstElement=r,void this._currentSize++}if(!n.next){var i={element:e,next:null};return n.next=i,void this._currentSize++}t=n,n=n.next}}function n(){var e=null;return this.firstElement&&(e=this.firstElement.element,this.firstElement=this.firstElement.next),this._currentSize--,e}function r(e){if(!e)return!1;for(var t=this.firstElement,n=null;t;){if(t.element===e)return n?n.next=t.next:this.firstElement=t.next,this._currentSize--,t.element;n=t,t=t.next}return!1}function i(){return this._currentSize}function o(e){for(var t=this.firstElement;t;)e(t.element),t=t.next}var a=function(e){this.init(e)};return a.prototype={init:e,add:t,pop:n,remove:r,size:i,forEach:o},a}angular.module("caveBattles.utils.ordered-list",[]).factory("OrderedList",e)}(),function(){"use strict";function e(){function e(){return t++}var t=42,n={getNewId:e};return n}angular.module("caveBattles.utils.id-generator",[]).factory("IdGenerator",e)}(),function(){"use strict";function e(){function e(e,t){var n=0,r=0;return n=t.x-e.x,n*=n,r=t.y-e.y,r*=r,Math.sqrt(n+r)}function t(e,t){return{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}function n(e,t){return 180*Math.atan2(t.y-e.y,t.x-e.x)/Math.PI}function r(e,t,n){return{x:e.x+(t.x-e.x)*n,y:e.y+(t.y-e.y)*n}}var i={distanceBetweenPoints:e,pointInBetween:t,inclinationFromTwoPointsDeg:n,getPointInBetween:r};return i}angular.module("caveBattles.utils.geometry",[]).factory("Geometry",e)}(),function(){"use strict";function e(){return{restrict:"E",scope:{playerInfo:"="},templateUrl:"app/player-picker/player-selector.tpl.html",controller:"PlayerSelectorController",controllerAs:"vm",bindToController:!0}}angular.module("caveBattles.player-selector",["caveBattles.player-selector.controller"]).directive("playerSelector",e)}(),function(){"use strict";function e(e,t){function n(){o.availableAIs=t.getAIs(),o.playerInfo.typeOfAI=o.availableAIs[0]}function r(e){o.playerInfo.type=e}function i(e){o.playerInfo.typeOfAI=e}var o=this;o.playerTypes=e,o.selectPlayerType=r,o.selectAIType=i,n()}angular.module("caveBattles.player-selector.controller",["caveBattles.player-types","caveBattles.ai"]).controller("PlayerSelectorController",e),e.$inject=["PLAYER_TYPES","AI"]}(),function(){"use strict";function e(){return{restrict:"E",scope:{map:"=",chosenPlayers:"="},templateUrl:"app/player-picker/player-picker.tpl.html",controller:"PlayerPickerController",controllerAs:"vm",bindToController:!0}}angular.module("caveBattles.player-picker",["caveBattles.player-picker.controller","caveBattles.player-selector"]).directive("playerPicker",e)}(),function(){"use strict";function e(e,t,n){function r(){e.$watch("vm.map",i)}function i(e){if(e){var r=t.filter(o.map.map.nodes,{initialNode:!0});o.chosenPlayers=[];for(var i=0;i<r.length;i++)o.chosenPlayers.push({initialNode:r[i].id,number:i+1+"",initialForce:n,type:0===i?"human":"AI"})}}var o=this;r()}angular.module("caveBattles.player-picker.controller",["ngLodash","caveBattles.battle.constants"]).controller("PlayerPickerController",e),e.$inject=["$scope","lodash","DEFAULT_INITIAL_FORCE"]}(),function(){"use strict";function e(){return{restrict:"E",scope:{chosenMap:"="},templateUrl:"app/map-picker/map-picker.tpl.html",controller:"MapPickerController",controllerAs:"vm",bindToController:!0}}angular.module("caveBattles.map-picker",["caveBattles.map-picker.controller"]).directive("mapPicker",e)}(),function(){"use strict";function e(e){function t(){e.getAllMaps().then(function(e){r.maps=e,r.chosenMap=r.maps[0]})}function n(e){r.chosenMap=r.chosenMap&&r.chosenMap===e?null:e}var r=this;r.chooseMap=n,t()}angular.module("caveBattles.map-picker.controller",["caveBattles.battle-config"]).controller("MapPickerController",e),e.$inject=["BattleConfig"]}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/main/main-screen.tpl.html",replace:!0,controller:"MainScreenController",controllerAs:"vm"}}angular.module("caveBattles.main-screen",["caveBattles.main-screen.controller","caveBattles.map-picker","caveBattles.battle-view","caveBattles.ai-trainer","caveBattles.player-picker"]).directive("mainScreen",e)}(),function(){"use strict";function e(e){function t(){r()&&(i.state=i.states.BATTLE,e.init(i.chosenMap,i.chosenPlayers))}function n(){i.state=i.states.AI_TRAINER}function r(){if(i.chosenMap&&i.chosenPlayers){for(var e=0,t=0;t<i.chosenPlayers.length;t++)"none"!==i.chosenPlayers[t].type&&e++;return e>1}return!1}var i=this;i.states={MAIN_SCREEN:"main_screen",AI_TRAINER:"ai_trainer",BATTLE:"battle"},i.state=i.states.MAIN_SCREEN,i.play=t,i.goToAITrainer=n,i.canBePlayed=r}angular.module("caveBattles.main-screen.controller",["caveBattles.battle-handler"]).controller("MainScreenController",e),e.$inject=["BattleHandler"]}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/battle-view/battle-view.tpl.html",replace:!0,controller:"BattleViewController",controllerAs:"vm"}}angular.module("caveBattles.battle-view",["caveBattles.battle-view.node","caveBattles.battle-view.tunnel","caveBattles.battle-view.army","caveBattles.battle-view.controller"]).directive("battleView",e)}(),function(){"use strict";function e(e,t,n){function r(){n.subscribeToBattleModelInitiallised(o)}function i(){function n(){t.hasEnded()?l.battleFinished=!0:(e(t.update),window.requestAnimationFrame(n))}window.requestAnimationFrame(n)}function o(){l.battleInfo=n.model,i()}function a(){t.removeCurrentSelection()}var l=this;l.onBackgroundClicked=a,r()}angular.module("caveBattles.battle-view.controller",["caveBattles.battle-handler","caveBattles.battle-model"]).controller("BattleViewController",e),e.$inject=["$timeout","BattleHandler","BattleModel"]}(),function(){"use strict";function e(e){function t(t,r){e.init(t,r);for(var i=(new Date).getTime();!e.hasEnded()&&(new Date).getTime()-i<n;)e.fastForwardAndExecuteNextAction();return e.getBattleModel().getStats()}var n=1e3,r={simulate:t};return r}angular.module("caveBattles.battle-simulator",["caveBattles.battle-handler"]).factory("BattleSimulator",e),e.$inject=["BattleHandler"]}(),function(){"use strict";angular.module("caveBattles.maps.map3",[]).constant("MAP3",{name:"Map 3",map:{nodes:[{id:"1",position:{x:50,y:10},initialNode:!0},{id:"2",position:{x:20,y:70},initialNode:!0},{id:"3",position:{x:80,y:70},initialNode:!0},{id:"4",position:{x:40,y:30}},{id:"5",position:{x:60,y:30}},{id:"6",position:{x:50,y:50}},{id:"7",position:{x:30,y:50}},{id:"8",position:{x:40,y:70}},{id:"9",position:{x:60,y:70}},{id:"10",position:{x:70,y:50}}],tunnels:[{from:"1",to:"4"},{from:"1",to:"5"},{from:"4",to:"5"},{from:"4",to:"6"},{from:"5",to:"6"},{from:"2",to:"7"},{from:"2",to:"8"},{from:"7",to:"8"},{from:"7",to:"6"},{from:"8",to:"6"},{from:"3",to:"9"},{from:"3",to:"10"},{from:"9",to:"10"},{from:"9",to:"6"},{from:"10",to:"6"},{from:"10",to:"5"},{from:"4",to:"7"},{from:"8",to:"9"}]}})}(),function(){"use strict";angular.module("caveBattles.maps.map2",[]).constant("MAP2",{name:"Map 2",map:{nodes:[{id:"1",position:{x:10,y:10},initialNode:!0},{id:"2",position:{x:50,y:10}},{id:"3",position:{x:90,y:10},initialNode:!0},{id:"4",position:{x:10,y:50}},{id:"5",position:{x:50,y:50}},{id:"6",position:{x:90,y:50}},{id:"7",position:{x:10,y:90}},{id:"8",position:{x:50,y:90}},{id:"9",position:{x:90,y:90},initialNode:!0}],tunnels:[{from:"1",to:"2"},{from:"2",to:"3"},{from:"6",to:"9"},{from:"9",to:"8"},{from:"8",to:"7"},{from:"7",to:"4"},{from:"4",to:"1"},{from:"1",to:"5"},{from:"3",to:"5"},{from:"9",to:"5"},{from:"2",to:"5"},{from:"8",to:"5"}]}})}(),function(){"use strict";angular.module("caveBattles.maps.map1",[]).constant("MAP1",{name:"Map 1",map:{nodes:[{id:"1",position:{x:10,y:10},initialNode:!0},{id:"2",position:{x:50,y:10}},{id:"3",position:{x:90,y:10},initialNode:!0},{id:"4",position:{x:10,y:50}},{id:"5",position:{x:50,y:50}},{id:"6",position:{x:90,y:50}},{id:"7",position:{x:10,y:90},initialNode:!0},{id:"8",position:{x:50,y:90}},{id:"9",position:{x:90,y:90},initialNode:!0}],tunnels:[{from:"1",to:"2"},{from:"2",to:"3"},{from:"3",to:"6"},{from:"6",to:"9"},{from:"9",to:"8"},{from:"8",to:"7"},{from:"7",to:"4"},{from:"4",to:"1"},{from:"1",to:"5"},{from:"3",to:"5"},{from:"7",to:"5"},{from:"9",to:"5"},{from:"2",to:"5"},{from:"8",to:"5"}]}})}(),function(){"use strict";function e(e,t,n,r){function i(){var i=e.defer();return i.resolve([t,n,r]),i.promise}var o={getAllMaps:i};return o}angular.module("caveBattles.battle-config",["caveBattles.maps.map1","caveBattles.maps.map2","caveBattles.maps.map3"]).factory("BattleConfig",e),e.$inject=["$q","MAP1","MAP2","MAP3"]}(),function(){angular.module("caveBattles.tunnel",["caveBattles.utils.id-generator","caveBattles.utils.geometry"]).factory("Tunnel",["IdGenerator","Geometry",function(e,t){var n=function(e,t){this.init(e,t)};return n.prototype={init:function(n,r){this.id=e.getNewId(),this.from=r[n.from],this.to=r[n.to],this.length=t.distanceBetweenPoints(this.from.position,this.to.position),this.middle=t.pointInBetween(this.from.position,this.to.position),this.inclinationDeg=t.inclinationFromTwoPointsDeg(this.from.position,this.to.position)},connectsNodes:function(e,t){return this.from.id===e.id&&this.to.id===t.id||this.to.id===e.id&&this.from.id===t.id?!0:!1}},n}])}(),function(){angular.module("caveBattles.player",["ngLodash","caveBattles.utils.id-generator"]).factory("Player",["lodash","IdGenerator",function(e,t){var n="human",r="AI",i=function(e){this.init(e)};return i.prototype={init:function(n){e.assign(this,n),this.id=t.getNewId()},isHuman:function(){return this.type===n},isAI:function(){return this.type===r},getAI:function(){return this.typeOfAI}},i}])}(),function(){"use strict";angular.module("caveBattles.player-types",[]).constant("PLAYER_TYPES",["human","AI","none"])}(),function(){angular.module("caveBattles.node",["ngLodash"]).factory("Node",["lodash",function(e){var t=1,n=50,r=function(t,n){e.assign(this,t),this.currentOwner=null,this.partialOwner=null,this._setOwnerStrength(0),this.battleModel=n};return r.prototype={DEFAULT_NODE_STRENGTH:10,fillNode:function(){this.currentOwner&&this._setOwnerStrength(this.ownerStrength+t)},handleArmyArriving:function(e){e.player===this.currentOwner?(this._setOwnerStrength(this.ownerStrength+e.force),e.destroy()):e.player===this.partialOwner?e.force>=this.DEFAULT_NODE_STRENGTH-this.ownerStrength?this._setArmyAsOwner(e,this.DEFAULT_NODE_STRENGTH-this.ownerStrength):(this._setOwnerStrength(this.ownerStrength+e.force),e.destroy()):this.currentOwner||this.partialOwner?this.currentOwner&&this.currentOwner!==e.player?this._handleArmyArrivingAtEnemyNode(e):this.partialOwner&&this.partialOwner!==e.player&&this._handleArmyArrivingAtEnemyNode(e):this._handleArmyArrivingAtEmptyNode(e)},canReachNode:function(e){if(!e)return!1;for(var t=0;t<this.battleModel.model.tunnels.length;t++)if(this.battleModel.model.tunnels[t].connectsNodes(this,e))return!0;return!1},updateCanBeReachedBySelectedNode:function(e){this.canBeReachedBySelectedNode=!1,e&&this.canReachNode(e)&&(this.canBeReachedBySelectedNode=!0)},_handleArmyArrivingAtEmptyNode:function(e){e.force>=this.DEFAULT_NODE_STRENGTH?this._setArmyAsOwner(e,e.force-this.DEFAULT_NODE_STRENGTH):(this.partialOwner=e.player,this._setOwnerStrength(e.force),e.destroy())},_handleArmyArrivingAtEnemyNode:function(e){e.force>this.ownerStrength?(e.force=e.force-this.ownerStrength,this._setOwnerStrength(0),this.currentOwner=null,this._handleArmyArrivingAtEmptyNode(e)):(this._setOwnerStrength(this.ownerStrength-e.force),e.destroy())},_setArmyAsOwner:function(e,t){(!t||0>t)&&(t=0),this._setOwnerStrength(t),this.currentOwner=e.player,this.partialOwner=null,e.destroy()},_setOwnerStrength:function(e){this.ownerStrength=Math.min(e,n)}},r}])}(),function(){"use strict";angular.module("caveBattles.battle.constants",[]).constant("DEFAULT_FORCE_TO_TAKE",1).constant("FILL_NODES_EVERY",1e3).constant("PLAN_AI_EVERY",1e3).constant("DEFAULT_INITIAL_FORCE",10)}(),function(){"use strict";angular.module("caveBattles.battle-scheduler",["caveBattles.utils.ordered-list","caveBattles.battle-actions-factory","caveBattles.utils.timer","caveBattles.battle-events"]).factory("BattleScheduler",["$timeout","$interval","OrderedList","BattleEvents","BattleActionsFactory","Timer",function(e,t,n,r,i,o){function a(){o.restart(),f=new n({orderBy:"timeAdded"}),p=new n({orderBy:"scheduledFor"}),v=null}function l(e,t){for(var n=i.getAction(e,t),r=0;r<n.ongoingEvents.length;r++)f.add(n.ongoingEvents[r]);for(r=0;r<n.scheduledEvents.length;r++)p.add(n.scheduledEvents[r]);c()}function s(){f.forEach(function(e){e.update()})}function c(){if(v&&e.cancel(v),p.firstElement){var t=p.firstElement.element.scheduledFor-o.getTime();0>=t&&(t=0),v=e(u,t)}}function u(){d(),c()}function d(){var e=p.firstElement.element.relatedOngoingEvents;if(e)for(var t=0;t<e.length;t++)f.remove(e[t]);p.firstElement.element.execute(),p.pop()}function m(){o.setTime(p.firstElement.element.scheduledFor)}var f,p,v,h={restart:a,addEvent:l,updateBattleInfo:s,fastForwardToFirstEvent:m,executeFirstElementInList:d};return h}])}(),function(){"use strict";function e(e,t,n,r,i,o,a){function l(e){g.nodes={},g.players=[],g.armies=[],g.tunnels=[],g.startingTime=o.getTime(),angular.forEach(e.map.nodes,function(e){g.nodes[e.id]=new i(e,B)}),angular.forEach(e.map.players,function(e){if("none"!==e.type){var n=new t(e);g.players.push(n),g.nodes[e.initialNode].currentOwner=n,g.nodes[e.initialNode].ownerStrength=n.initialForce}}),angular.forEach(e.map.tunnels,function(e){g.tunnels.push(new n(e,g.nodes))}),c()}function s(e){for(var t in g.nodes)g.nodes[t].updateCanBeReachedBySelectedNode(e)}function c(){angular.forEach(E,function(e){e()})}function u(e){E.push(e),e()}function d(t){E=e.without(E,t)}function m(){for(var t=[],n=0;n<g.armies.length;n++)g.armies[n].deleted&&t.push(g.armies[n]);for(n=0;n<t.length;n++)g.armies=e.without(g.armies,t[n])}function f(e,t){var n=Math.floor(e.ownerStrength*a);if(0===n)return null;var i=new r({force:n,player:e.currentOwner,originNode:e});return e.ownerStrength=e.ownerStrength-n,g.armies.push(i),{army:i,destinationNode:t,force:n}}function p(){for(var t={},n=0;n<g.armies.length;n++)g.armies[n].deleted||(t[g.armies[n].id]=!0);return angular.forEach(g.nodes,function(e){e.currentOwner&&(t[e.currentOwner.id]=!0)}),e.size(t)<=1}function v(){return{hasEnded:p(),winner:h(),runningTime:y()}}function h(){var e=null;return p()&&angular.forEach(g.nodes,function(t){t.currentOwner&&(e=t.currentOwner)}),e}function y(){return o.getTime()-g.startingTime}var g={nodes:null,players:null,armies:null,tunnels:null,startingTime:null},E=[],B={init:l,cleanDeletedArmies:m,updateNodesThatCanBeReachedFromSelectedNode:s,model:g,subscribeToBattleModelInitiallised:u,unsubscribeToBattleModelInitiallised:d,moveForcesBetweenNodesAndGetRelatedEvent:f,hasEnded:p,getStats:v};return B}angular.module("caveBattles.battle-model",["ngLodash","caveBattles.player","caveBattles.tunnel","caveBattles.army","caveBattles.node","caveBattles.battle.constants","caveBattles.utils.timer"]).factory("BattleModel",e),e.$inject=["lodash","Player","Tunnel","Army","Node","Timer","DEFAULT_FORCE_TO_TAKE"]}(),function(){function e(e,t,n,r,i){function o(t,n){v=angular.copy(t),v.map.players=n,e.restart(),i.init(v),a()}function a(){e.addEvent(t.FILL_NODES,{repeatEvery:n,scheduler:e}),e.addEvent(t.PLAN_AI,{scheduler:e,repeatEvery:r})}function l(){i.cleanDeletedArmies(),e.updateBattleInfo(y)}function s(e){c(),e.selected||e.currentOwner&&e.currentOwner.isHuman()&&(h=e,e.selected=!0),u()}function c(){h&&(h.selected=!1),h=null,u()}function u(){i.updateNodesThatCanBeReachedFromSelectedNode(h)}function d(n){if(h){var r=i.moveForcesBetweenNodesAndGetRelatedEvent(h,n);r&&e.addEvent(t.MOVE_ARMY,r),c()}}function m(){e.fastForwardToFirstEvent(),e.executeFirstElementInList(),l()}function f(){return i.hasEnded()}function p(){return i}var v,h=null,y={init:o,requestSelection:s,hasEnded:f,update:l,requestNodeForcesToGoToNode:d,removeCurrentSelection:c,fastForwardAndExecuteNextAction:m,getBattleModel:p};return y}angular.module("caveBattles.battle-handler",["caveBattles.battle-scheduler","caveBattles.battle.constants","caveBattles.battle-model","caveBattles.battle-events"]).service("BattleHandler",e),e.$inject=["BattleScheduler","BattleEvents","FILL_NODES_EVERY","PLAN_AI_EVERY","BattleModel"]}(),function(){"use strict";angular.module("caveBattles.battle-events",[]).constant("BattleEvents",{MOVE_ARMY:"MOVE_ARMY",FILL_NODES:"FILL_NODES",PLAN_AI:"PLAN_AI",MOVE_ARMY_IA:"MOVE_ARMY_IA"})}(),function(){function e(e,t,n,r,i){function o(o,a){switch(o){case e.MOVE_ARMY:return new t(a);case e.FILL_NODES:return new n(a);case e.PLAN_AI:return new r(a);case e.MOVE_ARMY_IA:return new i(a)}}var a={getAction:o};return a}angular.module("caveBattles.battle-actions-factory",["caveBattles.battle-events","caveBattles.actions.move-army","caveBattles.actions.fill-nodes","caveBattles.actions.plan-ia","caveBattles.actions.move-army-ia"]).factory("BattleActionsFactory",e),e.$inject=["BattleEvents","MoveArmyAction","FillNodesAction","PlanAIAction","MoveArmyIAAction"]}(),function(){"use strict";function e(e){function t(t){var n=e.distanceBetweenPoints(this.originNode.position,t.position);return n/this.DEFAULT_SPEED}function n(t,n){var r=t/1e3/this.timeToGetToDestination(n);r>1&&(r=1),0>r&&(r=0),this.position=e.getPointInBetween(this.originNode.position,n.position,r)}function r(e){this.force=this.force-e,this.force<=0&&this.destroy()}function i(){this.force=0,this.deleted=!0}var o=function(e){this.DEFAULT_INIT_FORCE=20,this.DEFAULT_SPEED=5,this.player=e.player,this.position=angular.copy(e.node?e.node.position:e.originNode.position),this.node=e.node,this.originNode=e.originNode,this.force=angular.isUndefined(e.force)?this.DEFAULT_INIT_FORCE:e.force};return o.prototype={timeToGetToDestination:t,updatePosition:n,removeForce:r,destroy:i},o}angular.module("caveBattles.army",["caveBattles.utils.geometry"]).factory("Army",e),e.$inject=["Geometry"]}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/ai-trainer/ai-trainer.tpl.html",controller:"AITrainerController",controllerAs:"vm"}}angular.module("caveBattles.ai-trainer",["caveBattles.ai-trainer.controller","caveBattles.player-picker","caveBattles.map-picker"]).directive("aiTrainer",e)}(),function(){"use strict";function e(e,t){function n(){i.results=[];for(var e=0;r>e;e++)i.results.push(t.simulate(i.chosenMap,i.chosenPlayers))}var r=10,i=this;i.runTrainer=n}angular.module("caveBattles.ai-trainer.controller",["caveBattles.battle-simulator"]).controller("AITrainerController",e),e.$inject=["$timeout","BattleSimulator"]}(),function(){"use strict";function e(e){function t(e,t){var r=n(t,e);return i(r)}function n(e,t){var n=[];return angular.forEach(e,function(i){r(i,t)&&(n=n.concat(o(i,e,t)))}),n}function r(e,t){return e.currentOwner&&e.currentOwner===t}function i(e){var t=0;return e.length>1&&(t=Math.floor(Math.random()*e.length)),e[t]}function o(e,t,n){var i=[];return angular.forEach(t,function(t){e.canReachNode(t)&&!r(t,n)&&e.ownerStrength>20&&i.push(a(e,t))}),i}function a(t,n){return{name:e.MOVE_ARMY_IA,params:{originNode:t,destinationNode:n}}}var l={name:"Simple AI",getNextAction:t};return l}angular.module("caveBattles.simple-ai",["caveBattles.battle-actions-factory","caveBattles.battle-events"]).factory("SimpleAI",e),e.$inject=["BattleEvents"]}(),function(){"use strict";function e(e){function t(e,t){var r=n(t,e);return i(r)}function n(e,t){var n=[];return angular.forEach(e,function(i){r(i,t)&&(n=n.concat(o(i,e,t)))}),n}function r(e,t){return e.currentOwner&&e.currentOwner===t}function i(e){var t=0;return e.length>1&&(t=Math.floor(Math.random()*e.length)),e[t]}function o(e,t,n){var i=[];return angular.forEach(t,function(t){e.canReachNode(t)&&!r(t,n)&&e.ownerStrength>20&&i.push(a(e,t))}),i}function a(t,n){return{name:e.MOVE_ARMY_IA,params:{originNode:t,destinationNode:n}}}var l={name:"Not So Simple AI",getNextAction:t};return l}angular.module("caveBattles.not-so-simple-ai",["caveBattles.battle-actions-factory","caveBattles.battle-events"]).factory("NotSoSimpleAI",e),e.$inject=["BattleEvents"]}(),function(){"use strict";function e(e,t){function n(){return[e,t]}var r={getAIs:n};return r}angular.module("caveBattles.ai",["caveBattles.simple-ai","caveBattles.not-so-simple-ai"]).factory("AI",e),e.$inject=["SimpleAI","NotSoSimpleAI"]}(),function(){"use strict";angular.module("caveBattles",["ngAnimate","ngCookies","ngTouch","ngSanitize","restangular","caveBattles.main-screen"])}(),angular.module("caveBattles").run(["$templateCache",function(e){e.put("app/ai-trainer/ai-trainer.tpl.html","<map-picker chosen-map='vm.chosenMap'></map-picker>\n<player-picker ng-if='vm.chosenMap' map='vm.chosenMap' chosen-players='vm.chosenPlayers'></player-picker>\n\n<button class='button' ng-click='vm.runTrainer()'>Run!</button>\n\n<ul>\n    <li ng-repeat='result in vm.results'>{{result.winner.number || 'No winner'}} - {{result.runningTime/1000 | number:3}}ms</li>\n</ul>"),e.put("app/battle-view/battle-view.tpl.html","<div class='battle-view' ng-click='vm.onBackgroundClicked()' >\n    <div ng-repeat='node in vm.battleInfo.nodes'>\n        <node node-info='node'></node>\n    </div>\n    <div ng-repeat='tunnel in vm.battleInfo.tunnels'>\n        <tunnel tunnel-info='tunnel'></tunnel>\n    </div>\n\n    <div ng-repeat='army in vm.battleInfo.armies'>\n        <army army-info='army'></army>\n    </div>\n\n    <div class='battle-view-finished' ng-if='vm.battleFinished'>\n        Battle finished!\n    </div>\n</div>"),e.put("app/main/main-screen.tpl.html","<div>\n\n    <div ng-if='vm.state === vm.states.MAIN_SCREEN' class='main-menu'>\n\n        <h1 class='main-title'>Cave Battles</h1>\n\n        <div class='main-screen-battle-config'>\n            <map-picker chosen-map='vm.chosenMap'></map-picker>\n            <player-picker ng-if='vm.chosenMap' map='vm.chosenMap' chosen-players='vm.chosenPlayers'></player-picker>\n        </div>\n\n        <div class='main-play-button-container'>\n            <button class='button main-play-button' ng-disabled='!vm.canBePlayed()' ng-click='vm.play()'>Play!</button>\n        </div>\n\n        <button class='button main-go-to-trainer-button' ng-click='vm.goToAITrainer()'>Go to AI trainer</button>\n    </div>\n\n    <battle-view ng-if='vm.state === vm.states.BATTLE'></battle-view>\n\n    <ai-trainer ng-if='vm.state === vm.states.AI_TRAINER'></ai-trainer>\n</div>"),e.put("app/map-picker/map-picker.tpl.html","<ul class='map-picker'>\n    <li class='map-picker-item' ng-repeat='map in vm.maps' ng-class='{\"is-selected\": vm.chosenMap === map}'>\n        <button class='button map-picker-button' ng-click='vm.chooseMap(map)'>{{map.name}}</button>\n    </li>\n</ul>"),e.put("app/player-picker/player-picker.tpl.html","<ul>\n    <li ng-repeat='player in vm.chosenPlayers'>\n        <player-selector player-info='player'></player-selector>\n    </li>\n</ul>"),e.put("app/player-picker/player-selector.tpl.html","<div class='player-selector'>\n    <div class='player-selector-number'>\n        {{vm.playerInfo.number}}\n    </div>\n    <div class='player-selector-type'>\n        <ul>\n            <li class='player-selector-item' ng-repeat='playerType in vm.playerTypes'>\n                <button\n                    class='button player-selector-button'\n                    ng-class='{\"is-selected\": playerType === vm.playerInfo.type}'\n                    ng-click='vm.selectPlayerType(playerType)'\n                >{{playerType}}</button>\n\n            </li>\n        </ul>\n        <div class='ai-selector' ng-if='vm.playerInfo.type === \"AI\"'>\n            <ul>\n                <li class='ai-selector-item' ng-repeat='ai in vm.availableAIs'>\n                    <button\n                        class='button ai-selector-button'\n                        ng-class='{\"is-selected\": ai === vm.playerInfo.typeOfAI}'\n                        ng-click='vm.selectAIType(ai)'\n                    >{{ai.name}}</button>\n\n                </li>\n            </ul>\n        </div>\n    </div>\n\n</div>"),e.put("app/battle-view/army/army.tpl.html",'<div class=\'army player-{{vm.armyInfo.player.number}}\'\n     ng-style=\'{"top": vm.armyInfo.position.y + "%", "left": vm.armyInfo.position.x + "%"}\'\n        >\n     {{vm.armyInfo.force}}\n </div>'),e.put("app/battle-view/node/node.tpl.html","<div\n    class='node player-{{vm.nodeInfo.currentOwner.number}}'\n    ng-class='{\n        \"can-be-clicked\": vm.nodeInfo.canBeReachedBySelectedNode,\n        \"selected\": vm.nodeInfo.selected,\n        \"has-owner\": !!vm.nodeInfo.currentOwner\n    }'\n    ng-style='{\"top\": vm.nodeInfo.position.y + \"%\", \"left\": vm.nodeInfo.position.x + \"%\"}',\n    ng-click='vm.nodeClicked($event)'\n>\n\n    <div class='node-inner'></div>\n    <div class='node-owner-strength' ng-show='!!vm.nodeInfo.currentOwner' >{{vm.nodeInfo.ownerStrength}}</div>\n    <div class='node-partial-owner-strength  player-{{vm.nodeInfo.partialOwner.number}}' ng-show='!!vm.nodeInfo.partialOwner' >\n        <div class='node-partial-owner-strength-inner' ng-style='{\"top\": vm.getTopFill() + \"%\"}' ></div>\n    </div>\n</div>"),e.put("app/battle-view/tunnel/tunnel.tpl.html",'<div    class=\'tunnel\'\n        ng-style=\'{\n            "width": tunnelInfo.length + "%",\n            "top": tunnelInfo.middle.y + "%",\n            "left": tunnelInfo.middle.x + "%",\n            "margin-left": -(tunnelInfo.length/2) + "%",\n            "transform": "rotate(" + tunnelInfo.inclinationDeg + "deg)"\n        }\'>\n</div>')
}]);