 $(document).ready(function() {
        $('.modal').MultiStep({
        	data:[{
        		content:'Hi!!'
        	},{
        		content:'This is a multi-step modal'
        	},{
        		content:'You can skip this if you want',
        		skip:true
        	},{
        		content:`This is the end<br>Hold your breath and count to ten`,
        	}]
        });
    });