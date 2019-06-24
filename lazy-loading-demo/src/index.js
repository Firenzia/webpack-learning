
// document.addEventListener('click',()=>{
//   import(/* webpackPrefetch: true */ 'lodash').then(({ default: _ }) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['Dell', 'Lee'], '-');
// 		return element;
// 	}).then(element => {
//     document.body.appendChild(element);
//   });
// })
document.addEventListener('click', () =>{
	import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
		func();
	})
});
