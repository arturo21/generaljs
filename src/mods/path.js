//Módulo - Path.JS - Enrutado
/************************************************/
path=(function(){
	//Submodulo Cookies

	//Submodulo path / Rewrite pathJS
	function version(){
		return "1.0.0";
	};
	return{
		//Write code below..
		getVersion:function(){
	        return version();
	    },
	    map:function(path){
	        if(path.routes.defined.hasOwnProperty(path)){
	            return path.routes.defined[path];
	        }
	        else{
				return new path.core.route(path);
	        }
	    },
	    root: function(path){
	        path.routes.root = path;
	    },
	    rescue: function(fn){
	        path.routes.rescue = fn;
	    },
	    history: {
	        initial:{}, // Empty container for "Initial Popstate" checking variables.
	        pushState: function(state, title, path){
	            if(path.history.supported){
	                if(path.dispatch(path)){
	                    history.pushState(state, title, path);
	                }
	            } else {
	                if(path.history.fallback){
	                    window.location.hash = "#" + path;
	                }
	            }
	        },
	        popState: function(event){
	            var initialPop = !path.history.initial.popped && location.href == path.history.initial.URL;
	            path.history.initial.popped = true;
	            if(initialPop) return;
	            path.dispatch(document.location.pathname);
	        },
	        listen: function(fallback){
	            path.history.supported = !!(window.history && window.history.pushState);
	            path.history.fallback  = fallback;

	            if(path.history.supported){
	                path.history.initial.popped = ('state' in window.history), path.history.initial.URL = location.href;
	                window.onpopstate = path.history.popState;
	            }
	            else{
	                if(path.history.fallback){
	                    for(route in path.routes.defined){
	                        if(route.charAt(0) != "#"){
	                          path.routes.defined["#"+route] = path.routes.defined[route];
	                          path.routes.defined["#"+route].path = "#"+route;
	                        }
	                    }
	                    path.listen();
	                }
	            }
	        }
	    },
	    match:function(path, parameterize){
				var compare="";
	      var params = {}, route = null, possible_routes, slice, i, j, compare;
				try{
	        for (route in path.routes.defined){
	            if (route !== null && route !== undefined){
	                route = path.routes.defined[route];
	                possible_routes = route.partition();
	                for (j = 0; j < possible_routes.length; j++){
	                    slice = possible_routes[j];
	                    compare = path;
	                    if (slice.search(/:/) > 0){
	                        for (i = 0; i < slice.split("/").length; i++){
	                            if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")){
	                                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
	                                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
	                            }
	                        }
	                    }
	                    if (slice === compare){
	                        if (parameterize){
	                            route.params = params;
	                        }
	                        return route;
	                    }
	                }
	            }
	        }
				}
				catch(e){
					g.log("EXCEPCION: Esta no es una ruta definida");
					g.log(e);
				}
				return null;
	    },
	    dispatch:function(passed_route){
	        var previous_route, matched_route;
	        if (path.routes.current !== passed_route){
	            path.routes.previous = path.routes.current;
	            path.routes.current = passed_route;
	            matched_route = path.match(passed_route, true);

	            if (path.routes.previous){
	                previous_route = path.match(path.routes.previous);
	                if (previous_route !== null && previous_route.do_exit !== null){
	                    previous_route.do_exit();
	                }
	            }

	            if (matched_route !== null){
	                matched_route.run();
	                return true;
	            } else {
	                if (path.routes.rescue !== null){
	                    path.routes.rescue();
	                }
	            }
	        }
	    },
	    listen:function(){
	        var fn = function(){ path.dispatch(location.hash); }

	        if (location.hash === ""){
	            if (path.routes.root !== null){
	                location.hash = path.routes.root;
	            }
	        }

	        // The 'document.documentMode' checks below ensure that pathJS fires the right events
	        // even in IE "Quirks Mode".
	        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)){
	            window.onhashchange = fn;
	        } else {
	            setInterval(fn, 50);
	        }

	        if(location.hash !== ""){
	            path.dispatch(location.hash);
	        }
	    },
	    core:{
	        route:function(path){
	            this.path = path;
	            this.action = null;
	            this.do_enter = [];
	            this.do_exit = null;
	            this.params = {};
	            path.routes.defined[path] = this;
	        }
	    },
	    routes:{
	        'current': null,
	        'root': null,
	        'rescue': null,
	        'previous': null,
	        'defined': {}
	    }
	}
}());
module.exports=path;