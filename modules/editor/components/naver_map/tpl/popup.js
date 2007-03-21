/**
 * popup으로 열렸을 경우 부모창의 위지윅에디터에 select된 멀티미디어 컴포넌트 코드를 체크하여
 * 있으면 가져와서 원하는 곳에 삽입
 **/
function getNaverMap() {
    return;
    // 부모 위지윅 에디터에서 선택된 영역이 있는지 확인
    if(typeof(opener)=="undefined") return;

    var node = opener.editorPrevNode;
    if(!node || node.nodeName != "DIV") return;

    var url = node.getAttribute("src");
    var caption = xInnerHtml(node);
    var width = node.getAttribute("width");
    if(width!=xWidth(node)) width = xWidth(node);
    var height = node.getAttribute("height");
    if(height!=xHeight(node)) height = xHeight(node);
    var auto_start = node.getAttribute("auto_start");

    xGetElementById("multimedia_url").value = url;
    xGetElementById("multimedia_caption").value = caption;
    xGetElementById("multimedia_width").value = width;
    xGetElementById("multimedia_height").value = height;
    if(auto_start=="true") xGetElementById("multimedia_auto_start").checked = true;

}

function insertNaverMap(obj) {
    if(typeof(opener)=="undefined") return;

    return;
    var url = xGetElementById("multimedia_url").value;

    var caption = xGetElementById("multimedia_caption").value;

    var width = xGetElementById("multimedia_width").value;
    if(!width) width = 640;

    var height = xGetElementById("multimedia_height").value;
    if(!height) height= 480;

    var auto_start = "false";
    if(xGetElementById("multimedia_auto_start").checked) auto_start = "true";

    if(!url) {
      window.close();
      return;
    }

    var text = "<div editor_component=\"multimedia_link\" class=\"editor_multimedia\" src=\""+url+"\" width=\""+width+"\" height=\""+height+"\" style=\"width:"+width+"px;height:"+height+"px;\" auto_start=\""+auto_start+"\">"+caption+"</div>";

    opener.editorFocus(opener.editorPrevSrl);

    var iframe_obj = opener.editorGetIFrame(opener.editorPrevSrl)

    opener.editorReplaceHTML(iframe_obj, text);
    opener.editorFocus(opener.editorPrevSrl);

    window.close();
}

xAddEventListener(window, "load", getNaverMap);

/* 네이버의 map openapi로 주소에 따른 좌표를 요청 */
function search_address() {
  var address = xGetElementById("adress");
  if(!address) return;

  var params = new Array();
  params['address'] = address;

  var response_tags = new Array('error','message','address_list');
  exec_xml('editor', 'procCall', params, complete_search_address);
}

function complete_search_address(ret_obj) {
  var address_list = ret_obj['address_list'];
  alert(address_list);
}
