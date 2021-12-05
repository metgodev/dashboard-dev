export function vw(percent){
	return document.body.clientWidth * percent / 100
}
export function vh(percent){
	return document.body.clientHeight * percent / 100
}

export function ready(fn) {
	if (document.readyState != 'loading'){
	  fn();
	} else if (document.addEventListener) {
	  document.addEventListener('DOMContentLoaded', fn);
	} else {
	  document.attachEvent('onreadystatechange', function() {
		if (document.readyState != 'loading')
		  fn();
	  });
	}
  }