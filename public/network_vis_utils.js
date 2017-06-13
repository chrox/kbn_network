const makeUnorderedList = (data) => {
  var list = document.createElement('ul');
  for(var i = 0; i < data.length; i++) {
      var item = document.createElement('li');
      var a = document.createElement('a');
      a.setAttribute('href', data[i].link);
      a.setAttribute('target', "_blank");
      a.innerHTML = data[i].name;
      item.appendChild(a);
      list.appendChild(item);
  }
  return list;
}

const makeCtxMenuData = (menuTemplate, key) => {
  var menuData = JSON.parse(menuTemplate || '[]');
  for (let item of menuData) {
    let link = item.link || "";
    item.link = link.replace("{key}", key);
  }
  return menuData;
}

export {
  makeUnorderedList,
  makeCtxMenuData,
}
