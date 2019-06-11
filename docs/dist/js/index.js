 $(document).ready(function() {
        $('.modal').MultiStep({
            title:'Multi modal',
        	data:[{
        		content:'Hi!!',
                label:'Custom label'
        	},{
        		content:'This is a multi-step modal'
        	},{
                content:`You can have skip options`,
                skip:true
            },{
        		content:`<small>You can include html content as well!</small><br><br>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                `,
        		skip:true
        	},{
        		content:`This is the end<br>Hold your breath and count to ten`,
        	}],
            final:'You can have your own final message',
            modalSize:'lg'
        });
    });