/*
 |--------------------------------------------------------------------------
 | SkyCaiji (蓝天采集器)
 |--------------------------------------------------------------------------
 | Copyright (c) 2018 https://www.skycaiji.com All rights reserved.
 |--------------------------------------------------------------------------
 | 使用协议  https://www.skycaiji.com/licenses
 |--------------------------------------------------------------------------
 */
'use strict';function CpatternEasy(){this.collIfrId='#ifr_collector';this.browserIfrId='#ifr_browser';this.guideId='#box_guide';this.timer=null;this.timerCount=0;this.intro=null;this.step={isNext:!1,from:null,to:null,last:null};this.getToStep=null;this.eleList=[{element:'#coll_tab [href="#coll_pattern_source"]',intro:'采集网页先配置抓取入口',is_tab:1},{element:'#coll_pattern_source .add-source-url',intro:'添加列表页网址',is_modal:1},{element:'#form_source [href="#tab_custom"]',intro:'切换到手工指定',in_modal:1},{element:'#form_source [name="source[urls]"]',intro:'输入网址，一行一条列表页网址(http://或https://开头)',in_modal:1},{element:'#form_source [type="submit"]',intro:'保存网址',in_modal:1,is_submit:1},{element:'#coll_pattern_source .c-p-source-urls > .form-group:last',intro:'刚才输入的列表页网址 <a href="javascript:;" onclick="cpEasyBrowser($(\'#coll_pattern_source .c-p-source-urls > .form-group:last input:text\').val());">分析网页</a>'},{element:'#coll_tab [href="#coll_pattern_link"]',intro:'从列表页中抓取内容页网址',is_tab:1},{element:'[href="#coll_pattern_level_url"]',intro:'如需从起始页中抓取列表页网址可添加多级网址（选填）',no_click:1},{element:'#panel_coll_pattern_cont_url',intro:'内容页网址获取'},{element:'#panel_coll_pattern_cont_url [href="#coll_pattern_link_filter"]',intro:'过滤得到最终的内容页网址（选填）',no_click:1},{element:'#panel_coll_pattern_cont_url [href="#coll_pattern_link_area"]',intro:'仅从页面某块区域中提取网址',is_accordion:1},{element:'#panel_coll_pattern_cont_url [name="config[area_module]"]',intro:'可选规则类型：正则、xpath、json'},{element:'#panel_coll_pattern_cont_url [name="config[area]"]',intro:'输入获取网址区域的规则'},{element:'#panel_coll_pattern_cont_url [href="#coll_pattern_link_url"]',intro:'精准抓取某种格式的网址',is_accordion:1},{element:'#panel_coll_pattern_cont_url [name="config[url_rule]"]',intro:'输入提取网址规则'},{element:'#panel_coll_pattern_cont_url [name="config[url_merge]"]',intro:'拼接成最终网址'},{element:'[href="#coll_pattern_relation_url"]',intro:'如需从其他页面中抓取数据可添加关联页网址（选填）',no_click:1},{element:'#coll_tab [href="#coll_pattern_field"]',intro:'从内容页中抓取数据',is_tab:1},{element:'#coll_pattern_field .add-field',intro:'添加一个字段',is_modal:1},{element:'#form_field [name="field[name]"]',intro:'字段名称',in_modal:1},{element:'#form_field [name="field[source]"]',intro:'选择数据源（默认内容页），如添加了多级页或关联页可以选择',in_modal:1},{element:'#form_field [name="field[module]"]',intro:'获取数据的方式',in_modal:1},{element:'#c_p_field_module',intro:'编辑字段',in_modal:1},{element:'#form_field [type="submit"]',intro:'保存字段',in_modal:1,is_submit:1},{element:'#coll_pattern_field .c-p-field-list tr:last',intro:'刚才保存的字段'},{element:'[href="#coll_pattern_process"]',intro:'将采集到的字段数据进行处理（选填）',no_click:1},{element:'[href="#coll_pattern_paging"]',intro:'从分页中抓取数据（选填）',no_click:1},{element:'#form_coll [type="submit"]',intro:'保存规则'},]}
CpatternEasy.prototype={constructor:CpatternEasy,init:function(){var $_o=this;var wHeight=$(window).height();var wWidth=$(window).width();var ifrWin=$($_o.collIfrId).get(0).contentWindow;if(wWidth>767){$($_o.collIfrId).height(wHeight+'px');$($_o.browserIfrId).height((wHeight-$($_o.browserIfrId).offset().top)+'px');$(ifrWin).resize(function(){$($_o.guideId).css('margin-left',$($_o.collIfrId).width()+'px')})}else{$($_o.collIfrId).height((wHeight-50)+'px');$($_o.browserIfrId).height(wHeight+'px')}
window.addEventListener("message",function(event){var json=event.data;if(dataIsJson(json)){json=JSON.parse(json);if(json.type=='browser_url'){$_o.browser_url(json)}}},!1);$('#btn_browser').on('click',function(){var pageSource=$('#browser_source').val();var url=$('#browser_url').val();var urls=$('#browser_urls').val();urls=dataIsJson(urls)?JSON.parse(urls):{};$('#browser_urls').val('');if(url){$('#ifr_loading').remove();$('#ifr_browser_box').append('<div id="ifr_loading"></div>');var browserUrl=cpBrowserUrl($('#coll_id').val(),pageSource,url,urls);$($_o.browserIfrId).attr('src',browserUrl).show()}});$('#browser_url').on('keyup',function(event){　　if(event.keyCode=="13"){　　　　$('#btn_browser').trigger('click');　　}});$($_o.collIfrId).bind('load',function(){var ifr=$($_o.collIfrId).contents();var wrapper=ifr.find('body').children('.wrapper');wrapper.children('.main-header').hide();wrapper.children('.main-sidebar').hide();wrapper.children('.content-wrapper').css('margin-left','0px');var link=window.document.createElement('link');link.setAttribute('rel','stylesheet');link.setAttribute('type','text/css');link.setAttribute('href',window.site_config.pub+'/static/css/introjs.css?'+new Date().getTime());var script=window.document.createElement('script');script.setAttribute('type','text/javascript');script.setAttribute('src',window.site_config.pub+'/static/js/intro.js?'+new Date().getTime());var style=window.document.createElement('style');style.type='text/css';style.innerHTML='.intro-form-coll-zindex *{z-index:auto!important;} '+' .intro-hide .introjs-helperLayer,.intro-hide .introjs-tooltipReferenceLayer{display:none!important;}';ifr.find('head')[0].appendChild(link);ifr.find('head')[0].appendChild(script);ifr.find('head')[0].appendChild(style);$_o.intro=null});$($_o.browserIfrId).bind('load',function(){$('#ifr_loading').remove();var ifr=$($_o.browserIfrId).contents();var consoleEle=ifr.find('#skycaiji_console');if(!consoleEle||consoleEle.length<=0){var wrapper=ifr.find('body').children('.wrapper');wrapper.children('.main-header').hide();wrapper.children('.main-sidebar').hide();wrapper.children('.content-wrapper').css('margin-left','0px')}})},coll_guide:function(){var $_o=this;var ifrWin=$(this.collIfrId)[0].contentWindow;var ifrJq=ifrWin.$;ifrJq('body').on('shown.bs.modal','#myModal',function(){ifrJq('#form_coll').addClass('intro-form-coll-zindex');ifrJq('#form_coll').find('.introjs-showElement,.introjs-relativePosition').removeClass('introjs-showElement introjs-relativePosition')});ifrJq('body').on('hidden.bs.modal','#myModal',function(){ifrJq('#form_coll').removeClass('intro-form-coll-zindex')});var stepList=[];for(var i in $_o.eleList){var eleParams=$_o.eleList[i]?$_o.eleList[i]:{};stepList.push({element:eleParams.element?eleParams.element:'',intro:eleParams.intro?eleParams.intro:'',position:eleParams.position?eleParams.position:null})}
$_o.intro=ifrWin.introJs();$_o.intro.setOptions({prevLabel:'上一步',nextLabel:'下一步',skipLabel:'跳过',doneLabel:'结束',showBullets:!1,steps:stepList}).onbeforechange(function(targetElement){var toStep=$_o.intro._currentStep;if(ifrJq($_o.eleList[toStep].element).length<=0){ifrJq('body').addClass('intro-hide')}}).onchange(function(targetElement){var toStep=$_o.intro._currentStep;toStep=parseInt(toStep);var curStep=0;var isNext=!1;var isJump=!1;if($_o.getToStep){isNext=$_o.getToStep.isNext?true:!1;$_o.getToStep=null;isJump=1}else{if($_o.intro._direction=='backward'){isNext=!1}else{isNext=!0}}
if(isNext){curStep=toStep-1}else{curStep=toStep+1}
if(curStep>=0){var curStepEle=$_o.eleList[curStep];var toStepEle=$_o.eleList[toStep];var canClick=!1;if(isNext){if(toStepEle.in_modal){if(ifrJq('#myModal').length<=0||ifrJq('#myModal').is(':hidden')){canClick=!0}}else{canClick=!0}}else if(curStepEle.prev){canClick=!0}
if(ifrJq(toStepEle.element).is(':visible')&&curStepEle.is_accordion){canClick=!1}
if(isJump&&curStepEle.is_submit){canClick=!1}
if(curStepEle.no_click){canClick=!1}
ifrJq(ifrWin).ajaxSuccess(null);if(canClick){ifrJq(curStepEle.element).click();ifrJq(ifrWin).ajaxSuccess(function(getEvent,getXhr,getOptions){$_o.intro._targetElement=ifrJq('body')[0];for(var i in $_o.eleList){var eqStart=$_o.eleList[i].element.indexOf(':');if(eqStart>-1){ifrJq($_o.eleList[i].element.substr(0,eqStart)).removeClass('introjs-showElement introjs-relativePosition');$_o.intro._introItems[i].element=(ifrJq($_o.eleList[i].element).addClass('introjs-showElement introjs-relativePosition'))[0]}}
$_o.intro.refresh();if(getXhr.responseJSON){if(getXhr.responseJSON.code==0){if(curStepEle.is_submit){ifrJq(ifrWin).ajaxSuccess(null);$_o.coll_goto_step(curStep-1,isNext);return}}}})}
$_o.step.isNext=isNext;$_o.step.from=curStep;$_o.step.to=toStep;$_o.step.last=toStep;if(ifrJq(toStepEle.element).length<=0){if(isNext){if(toStepEle.in_modal&&(ifrJq('#myModal').length<=0||ifrJq('#myModal').is(':hidden'))){var modalStep=null;for(var i in $_o.eleList){if($_o.eleList[i].is_modal&&i<=toStep){modalStep=parseInt(i)}}
if(modalStep!=null&&modalStep>=0){$_o.coll_goto_step(modalStep,!0);$_o.coll_goto_step(toStep,isNext);return}}
ifrJq('body').addClass('intro-hide');ifrJq('.introjs-overlay').remove();$_o.timer_open(function(){if(ifrJq(toStepEle.element).length>0){$_o.timer_close();ifrJq('body').removeClass('intro-hide');if(ifrJq('#myModal').is(':visible')){ifrJq('#myModal').css('position','absolute');ifrJq('.modal-backdrop').css({'opacity':0})}
$_o.coll_goto_step(toStep,isNext);return}})}}else{ifrJq('body').removeClass('intro-hide');var tabStep=null;var accordionStep=null;for(var i in $_o.eleList){if($_o.eleList[i].is_tab&&i<=toStep){tabStep=parseInt(i)}}
for(var i in $_o.eleList){if($_o.eleList[i].is_accordion&&i>tabStep&&i<toStep){accordionStep=parseInt(i)}}
if(!ifrJq(toStepEle.element).is(':visible')){if(tabStep!=null&&tabStep>=0){ifrJq($_o.eleList[tabStep].element).click()}}
if(!ifrJq(toStepEle.element).is(':visible')){if(accordionStep!=null&&accordionStep>=0){ifrJq($_o.eleList[accordionStep].element).click()}}
if(isNext){if(!ifrJq(toStepEle.element).is(':visible')){$_o.coll_goto_step(toStep,isNext);return}}else{if(!toStepEle.in_modal){ifrJq('#myModal').modal('hide')}else if(toStepEle.in_modal&&(ifrJq('#myModal').length<=0||ifrJq('#myModal').is(':hidden'))){var modalStep=null;for(var i in $_o.eleList){if($_o.eleList[i].is_modal&&i<=toStep){modalStep=parseInt(i)}}
if(modalStep!=null&&modalStep>=0){$_o.coll_goto_step(modalStep,!0);$_o.coll_goto_step(toStep,isNext);return}}}}}}).start()},coll_goto_step:function(step,isNext){var $_o=this;if(step>=0){isNext=isNext==!0?true:!1}else{step=$_o.step.last;isNext=!0}
if(step<=0){$_o.coll_guide()}else{if(!$_o.intro){$_o.coll_guide()}
$_o.getToStep={isNext:isNext};$_o.intro.exit();var ifrJq=$($_o.collIfrId)[0].contentWindow.$;ifrJq('.introjs-overlay').remove();$_o.intro._targetElement=ifrJq('body')[0];$_o.intro.refresh();$_o.intro.goToStep(step).start()}},timer_open:function(func){if(this.timer){clearInterval(this.timer)}
if(this.timerCount>10){clearInterval(this.timer)}
this.timer=window.setInterval(func,500)},timer_close:function(){if(this.timer){window.clearInterval(this.timer)}},start_coll_guide:function(){this.coll_goto_step()},browser_url:function(data){$('#browser_source').val(data.page_source);$('#browser_url').val(data.test_url);$('#browser_urls').val(JSON.stringify(data.input_urls));$('#btn_browser').click()}}
var cpatternEasy=null;$(document).ready(function(){window.cpatternEasy=new CpatternEasy();window.cpatternEasy.init()})