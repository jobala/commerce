(function(){

    window.addEventListener("load", function(){

        var showuRef = document.querySelector('#crankwheel-com-showu');
        var modalContent = document.querySelector('#showu-modal-content');
        var poweredBy = document.querySelector('#crankwheel-com-showu-powered-by h6');
        if(typeof showuRef == 'undefined' || showuRef == null) return;
        if(typeof modalContent == 'undefined'  || modalContent == null) return;

        var container = showuRef.querySelector('#crankwheel-com-showu-container');
        document.querySelectorAll('[data-schedule-demo]').forEach(function(link){
            link.addEventListener('click', function(){
                if(typeof clone_showu != 'undefined')
                    clone_showu.launch();
            });
        });
        window['clone_showu'] = {
            launch: function(){

                //appending new content
                var contentFragment = (modalContent.content instanceof DocumentFragment)?modalContent.content:modalContent;
                var clone = contentFragment.firstElementChild.cloneNode(true);
                var footer = contentFragment.lastElementChild.cloneNode(true);
                container.prepend(clone);
                poweredBy.appendChild(footer);

                clone.querySelector('.button-close-dod').addEventListener("click", function(e){
                    clone.remove();
                    footer.remove();
                    showuRef.classList.add('hide');
                    container.classList.remove('show');
                    poweredBy.firstElementChild.classList.remove('hide');
                });
                clone.querySelector('#get-demo-asap').addEventListener("click", function(e){
                    clone.remove();
                    footer.remove();
                    container.classList.remove('show');
                    poweredBy.firstElementChild.classList.remove('hide');
                    showu.launch();
                });
                clone.querySelector('#schedule-demo').addEventListener("click", function(e){
                    clone.remove();
                    footer.remove();
                    showuRef.classList.add('hide');
                    container.classList.remove('show');
                    poweredBy.firstElementChild.classList.remove('hide');
                    window.location.href = "https://calendly.com/gilsi/demo";
                });

                //showing showu container manually
                showuRef.classList.remove('hide');
                container.classList.add('show');
                poweredBy.firstElementChild.classList.add('hide');
                
            }
        };    
    });

})();
