
var screenplay = [
	{'time':17.10, 'txt': "You could be happy"},
	{'time':19.86, 'txt': "And I won't know."},
	{'time':24.88, 'txt': "But you weren't happy"},
	{'time':26.44, 'txt': "The day I watched you go"},

	{'time':33.64, 'txt': "And all the things"},
	{'time':35.37, 'txt': "That I wished I had not said"},
	{'time':41.86, 'txt': "Are played on loops"},
	{'time':43.52, 'txt': "Till it's madness in my head"},

	{'time':50.76, 'txt': "Is it too late to remind you"},
	{'time':54.28, 'txt': "How we were?"},
	{'time':59.36, 'txt': "But not our last days of silence"},
	{'time':62.97, 'txt': "Screaming, blur..."},

	{'time':68.13, 'txt': "Most of what I remember"},
	{'time':71.56, 'txt': "Makes me sure"},
	{'time':76.47, 'txt': "I should have stopped you from walking"},
	{'time':80.53, 'txt': "Out the door"},
	
	//breath.
	{'time':83.3, 'txt': ""},

	{'time':85.97, 'txt': "You could be happy"},
	{'time':88.50, 'txt': "I hope you are."},
	{'time':94.55, 'txt': "You made me happier"},
	{'time':95.85, 'txt': "Than I'd been by far."},

	{'time':102.80, 'txt': "Somehow everything"},
	{'time':104.37, 'txt': "I own smells of you."},
	{'time':111.39, 'txt': "And for the tiniest moment"},
	{'time':114.72, 'txt': "It's all not true..."},

	{'time':120.24, 'txt': "Do the things"},
	{'time':121.71, 'txt': "That you always wanted to."},
	{'time':128.59, 'txt': "Without me there to hold you back"},
	{'time':132.11, 'txt': "Don't think, just do."},

	{'time':137.45, 'txt': "More than anything,"},
	{'time':139.61, 'txt': "I want to see you grow."},
	{'time':146.59, 'txt': "Take a glorious bite"},
	{'time':148.42, 'txt': "Out of the whole world..."},
	
	{'time':156.00, 'txt': ""},
	
	{'time':166.00, 'txt': ":)"},
];

var trajectory = {
	'transition' : ['fade',
					'add-bottom',
					'fade',
					'add-bottom',

					'fade',
					'add-bottom',
					'fade',
					'add-bottom',

					'fade',
					'add-bottom',
					'fade',
					'add-bottom',

					'fade',
					'add-bottom',
					'fade',
					'add-bottom',

					//breath.
					'fade',

					'fade',
					'add-bottom',
					'fade',
					'add-bottom',

					'fade',
					'add-bottom',
					'fade',
					'add-bottom',

					'fade',
					'add-bottom',
					'fade',
					'add-bottom',

					'fade',
					'add-bottom',
					'fade',
					'add-bottom',
					
					'fade',
					'fade',
	],
	'storyboard' : {
		'default': {'type':'white'},
		'scenario': [
			{'time': 3, 'type': 'gradient', 'options':{'to':'#000'}},
		 	{'time': 10, 'type': 'gradient', 'options':{'to':'#bdf'}},
				{'time': 59.5, 'type': 'gradient', 'options':{'to':'#f83','text-to':'#fff'}},
			{'time': 68, 'type': 'gradient', 'options':{'to':'#bdf','text-to':'#333'}},
			{'time': 76, 'type': 'photo','options':{'url':'visa.jpg','max-opacity':0.5,'increment-x':'-0.5','start-x':'0'}},
			{'time': 76.8, 'type': 'fonteffect','options':{'text-shadow':'0px 0px 6px #222','color':'#efefef'}},
			{'time': 81, 'type': 'gradient', 'options':{'to':'#001'}},
			{'time': 85.5, 'type': 'fonteffect','options':{'text-shadow':'none'}},
			{'time': 86, 'type': 'starrynight'},
			{'time': 160, 'type': 'fonteffect', 
					'options':{'font-size':'47px',
							   'font-family':'"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
							   'color':'#333',
							   'text-shadow':'0px 0px 3px #555',
							   '-webkit-transition-duration':'1s',
							   '-moz-transition-duration':'1s',
							   'transition-duration':'1s'}},
			{'time': 156, 'type': 'fadenight'},
			{'time': 163, 'type': 'bodyeffect', 'options':{'no-animation':true,'background-color':'#fff','color':'#333','background-image':'none'}},
		]
	}
};
