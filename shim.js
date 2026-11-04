/* Version indépendante : remplace les fonctions Claude absentes */
(function(){
  if(window.claude&&window.claude.use)return;
  async function save(o){
    const blob=o.data instanceof Blob?o.data:new Blob([o.data],{type:'text/plain'});
    const file=new File([blob],o.filename,{type:blob.type||'application/octet-stream'});
    try{if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:o.filename});return;}}catch(e){if(e&&e.name==='AbortError')throw {code:'declined'};}
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=o.filename;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},4000);
  }
  window.claude={use:async n=>n==='downloads'?{save}:null};
})();
