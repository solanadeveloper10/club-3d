const ASSET_BASE_URL = 'http://localhost:3000';


// new Twitch.Player("twitch-embed", {
// 	channel: "itmejp"
// });

$("#unmute").css("display", "none");
$("#unmute").css("width", "60%");
$("#unmute").css("height", "15%");
$("#unmute").css({ "top": "40%", "left": "20%", "border": "2px solid #333333", "color": "white", "background-color": "#555555", "padding": "15px 32px", "text-align": "center", "text-decoration": "none", "font-size": "16px", "font-style": "Helvetica,Arial,sans-serif" },);


$("#gamelog").hide();

//HIDE PLAY BUTTON
// document.getElementById("play_overlay").classList.add('hidden');

//INIT PLAY BUTTON
var buttonElement = document.getElementById("play_button");
//var buttonOverlayElement = document.getElementById("play_overlay");
var playButtonVisible = true;
buttonElement.style.display = "none";

//document.getElementById("play_overlay").style.filter = 'drop-shadow(4px 4px 10px black) drop-shadow(0px 0px 40px #000000)drop-shadow(0px 0px 30px #000000);';

//INPUT FORM SELECTED TO TRUE
function focusOn() {
    selected = true;
}

//SHOW BUTTON WHEN TEXT IN INPUT BAR
function inputName() {
    if ($("#nameInput").length > 0)
        $('#nameInputbutton').show()
    else
        $('#nameInputbutton').hide()
}

//SET SHADERS
function setShader(value) {
    game.player.shaderIndex = value;
    game.player.socket.emit("get shaders", game.player.shaderIndex);

    game.player.object.traverse(function (child) {
        if (child.isSkinnedMesh) {
            child.material = game.materials[game.player.shaderIndex];
        }
    });
}

function inputMessage() {
    if ($("#messageInput").length > 0)
        $('#messageInputbutton').show()
    else
        $('#messageInputbutton').hide()
}



// $("#messageInput").on("change", function() {
//     // var ret = parseInt($("#field1").val()) + parseInt($("#field2").val() || '0')
//     $('#messageInputbutton').css("display","block");

// })

$('#messageInput').keyup(function () {
    var maxLength = $(this).attr("maxlength");
    if (maxLength == $(this).val().length) {
        showTitle("message is too long");
    }
    if ($.trim(this.value).length > 0)
        $('#messageInputbutton').show()
    else
        $('#messageInputbutton').hide()
});


$('#nameInput').keyup(function () {
    var maxLength = $(this).attr("maxlength");
    if (maxLength == $(this).val().length) {
        showTitle("name is too long");
    }
    if ($.trim(this.value).length > 0)
        $('#nameInputbutton').show()
    else
        $('#nameInputbutton').hide()
});

$('#nameInput').oninput = function () {
    // console.log("paste");
    if (this.value.length > 0) {
        $('#nameInputbutton').show()
    }
    // this.value = this.value.substring(0, 0); //
}
$('#messageInput').oninput = function () {
    // console.log("paste");
    if (this.value.length > 0) {
        $('#messageInputbutton').show()
    }
    // this.value = this.value.substring(0, 0); //
}
// hideButton();

var game;
var youtubePlayer;
var twitchPlayer;
var twitchLoaded = false;
var twitchApiReady = false;
var twitchIsPlaying = false;
var playerPopout;
var embed;
var delay = 25;
var nextTime = 0;
var number = 0;
var loadingScreenFaded = false;
var kicked = false;
var canJump = true;
var startEngines;
var enginesStarted;

var lasersOn = false;
var eyesOn = false;
var lasersInitialized = false;
var eyesInitialized = false;

var isMobile = false;
(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true; })(navigator.userAgent || navigator.vendor || window.opera);
if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
    isMobile = true;
    console.log("iPad");
};

var isChrome = false;

function detectBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
        return 'IE'; //crap
    } else {
        return 'Unknown';
    }
}
var browser = detectBrowser();

if (browser === 'Chrome') {
    isChrome = true;

}
// console.log({ isChrome });


var isIframe = false;

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
isIframe = inIframe();
//  var isMobile = false;

var fwd = 0;
var jump = 0;
var turn = 0;
var pos;
var selected;
let username;
var red = 0;
var playa;
var hitsoundplaying = false;
var globalSongIndex;
var muted = false;
var ffplayerLoaded = false;
var videoPlaying = false;
var youtubeIsPlaying = false;
var videoId = 'jVrEO6zmV6g';
var shroomDone, shroomOver, acidDone, acidOver;
var superShroom = false;
var acidTrip = false;
var disconnectPlayer;
var scores = [];
var currentScores = [];
var showScores;
var showGlobalScores;
var showingScores;
var winner;
var shroomActivatedGlobal = false;
var walkInCircle = false;
var actionIndex;
var moving = false;
var num = 0;
var dancingcheck = false;
var danceIndex;
var downloadingDubplate;

var tooltipShown = false;
// var cssscene, cssrenderer; //Boom

// document.getElementById('myAudioTagID').play();
// var powerup = new Audio('mp3/powerup.mp3')
// var audioPowerup = new Audio('mp3/powerup2.mp3');
// // audioPowerup.muted = true;

// var audioHit = new Audio('mp3/hit.mp3');

var audioBeats;
// audioHit.muted = true;

// window.onload = function() {
//   var context = new AudioContext();
// }
// context.resume().then(() => {
//     audio.play();
//     console.log('Playback resumed successfully');
//   });

function powerupPlay() {
    audioPowerup.play();
}

function hitSound() {
    audioHit.play();
    hitsoundplaying = true;
    audioHit.addEventListener('ended', function () {
        hitsoundplaying = false;
    }, false);


}

var anims = [
    'Idle', //0
    'Running', //1
    'Walking Backwards', //2
    'Running Forward Flip', //3
    'Left Turn', //4
    'Dancing Twerk', //5
    '2 Twerk', //6
    '3 Twerk', //7
    '6 Twerk', //8
    '7 Twerk', //9
    '5 Twerk', //10
];

var animsLookup = [
    'Idle', //0
    'Running', //1
    'Walking Backwards', //2
    'Running Forward Flip', //3
    'Left Turn', //4
    'Dancing Twerk', //5
    '2 Twerk', //6
    '3 Twerk', //7
    '6 Twerk', //8
    '7 Twerk', //9
    '5 Twerk', //10
];

// console.log (anims[2]);

var playInitialized = false;
var youtubeInitialized = false;
var youtubeApiLoaded = false;


//FFPLAYER INIT BELOW

var playButtonVisible = false;
var buttonElement = document.getElementById("play_button");
buttonElement.style.display = "none";

var strobe = true;



var pwn;
var yt;
var ff;
var tw;

var index = 0; var thisffplayer;
var useSoundCloudPlayer = false;
var useAudioAnalysis = false;

// Add near line 292 where audioContextStarted is declared
var audioContextStarted = false;

// Add the new function after that
function initAudioAfterInteraction() {
    document.addEventListener('click', function initAudio() {
        if (typeof AudioContext !== 'undefined' && !audioContextStarted) {
            if (window.AudioContext && useAudioAnalysis && !analyser) {
                audioCtx = new AudioContext();
                audioCtx.resume();
                audioContextStarted = true;
                if (!playInitialized && !youtubeMode && !twitchMode) {
                    initAudioAnalysis();
                }
            }
        }
        document.removeEventListener('click', initAudio);
    }, { once: true });
}

// Then call this function when the page loads
// Add this near the bottom of the file or in your initialization code
document.addEventListener('DOMContentLoaded', function () {
    initAudioAfterInteraction();
});

var useMouseHeading = false;

var youtubeMode = false;

var twitchMode = false;

var youtubeScreenMinimized = false;

if (youtubeMode) {
    useAudioAnalysis = false;
}
var showplayer = false;

var audioCtx;
var analyser;
var currentAudioSrc;
var audioSignal1;

var audioBeatsLoaded = false;


var freqByteData;

var levelsCount = 16; // should be factor of 512
var binCount;
var levelBins;

var dancingShader = false;

var levelsData = [];
var gotoZ;

var mousedown;
var keydown;
var changeLooks;
var displayYoutube;

var lastpacket;

var currentBPM;
var beatValue = true,
    prev_beatValue = false;

// const video = document.getElementById( 'video' );
// var videoTexture = new THREE.VideoTexture( video );

// var debug = {};
// debug.addMessage = function(title, msg) {
//      mob_debug.innerHTML += title + ": " + msg + "<br/>";
// }

// -----------------------------------------------------------------------------------------------
// audio beats
// -----------------------------------------------------------------------------------------------


var currentSongIndex = 0;
var currentAudioElement = null;

var useAudioBeats = !youtubeMode;
// var test = JSON.parse($('mp3/YNB.json').html());


// function jsonGetter (url)  {
//     var json = null;
//     $.ajax({
//         'async': true,
//         'global': false,
//         'url': url,
//         'dataType': "json",
//         'success': function (data) {
//             json = data;
//         }
//     });
//     return json;
// }; 

async function jsonGetter(file) {
    let response = await fetch(file);
    let responsejson = await response.json();
    let str = JSON.stringify(responsejson);
    let jsonData = JSON.parse(str);

    return jsonData;
};

async function getJsonFiles() {
    audioBeats = [
        await jsonGetter("midi_to_json/data/YBN Almighty Jay - Two Tone Drip (Zora Jones & Sinjin Hawke Bootleg)  78.50.json"),
        await jsonGetter("midi_to_json/data/Cosha TG - Call My Phone (Xzavier Stone Bootleg) 70.json"),
        await jsonGetter("midi_to_json/data/Dj Pierre - Time It Takes (Zora Jones Bootleg) 53.50.json"),
        await jsonGetter("midi_to_json/data/Dom Kennedy - My Type Of party (Zora Jones Edit) 65.json"), //DOM KENNEDY
        await jsonGetter("midi_to_json/data/Busy Signal - Brave & Bold (Sinjin Hawke Edit) 60.json"),
        await jsonGetter("midi_to_json/data/Beek - Blow Ya Smoke (Sinjin Hawke Edit) 55.json"), //BlowYaSmoke
        await jsonGetter("midi_to_json/data/Busta - We Gonna Do It (Zubotnik Edit) 56.json"),
        await jsonGetter("midi_to_json/data/Beatking - Throw That Ahh & Uncle Luke (Sinjin Hawke Refix) 80.json"),
        await jsonGetter("midi_to_json/data/Ciara - Go Girl (Zora Jones Edit) 75.json"),
        // await jsonGetter("midi_to_json/data/Cuppcake - Blackjack (Zora Jones Edit) 65.json"),
        await jsonGetter("midi_to_json/data/Divoli S'vere - Free Bitch (Sinjin Hawke Remix) 62.50.json"),
        await jsonGetter("midi_to_json/data/Eric Bellinger - Bedroom Love (Sinjin Hawke Edit) 63.50.json"),
        await jsonGetter("midi_to_json/data/FKA Twigs - In Time (Sinjin Hawke Edit) 63.50.json"), //FKA TWIGS
        await jsonGetter("midi_to_json/data/Lady Saw - Last Night (Sinjin Hawke Refix) 62.json"),
        await jsonGetter("midi_to_json/data/Masters At Work - Work (Sinjin Hawke Edit) 60.json"), // MASTERS AT WORK
        await jsonGetter("midi_to_json/data/Mc Money & Gangsta Gold - Glock Tight Smoked Out (Xzavier Stone Bootleg) 69.json"),
        await jsonGetter("midi_to_json/data/Missy Elliot - Tempo (Sinjin Edit) 60.json"),
        await jsonGetter("midi_to_json/data/Playboi Carti - RIP Fredo (Notice Me) (Xzavier Stone Edit) 70.json"),
        await jsonGetter("midi_to_json/data/Playboy Carti - Kid Cudi (Sinjin Hawke Bootleg) 80.json"),
        await jsonGetter("midi_to_json/data/Sinjin Hawke - Dont Lose Yourself To This (Zubotnik Bootleg) 50.json"),
        await jsonGetter("midi_to_json/data/Sinjin Hawke, Pink Dollaz & L-Vis - Cake (Sinjin Hawke Edit) 52.json"),
        await jsonGetter("midi_to_json/data/Brandy - Sittin In My Room (Sinjin Hawke & Xzavier Stone Bootleg) 62.50.json"), // BRANDY
        await jsonGetter("midi_to_json/data/Sophia Akkara - Teri Meri (Zora Jones Bootleg) 88 .json"),
        await jsonGetter("midi_to_json/data/Spaceghostpurrp - No Mid (Zora Jones Bootleg) 44.json"), //SPACEGHOST
        await jsonGetter("midi_to_json/data/Syringe - I Don't Like U (Sinjin Hawke & Zora Jones Bootleg) 57.50.json"), //1 Don't Like u
        await jsonGetter("midi_to_json/data/T-Pain - Booty Butt Ass (Zora Jones Bootleg)  48.50.json"), //TPAIN
        await jsonGetter("midi_to_json/data/Teenear - Streetlights (Zubotnik Bootleg) 60.50.json"), //TEENEAR ZUBOTNIK

        await jsonGetter("midi_to_json/data/Beatking - THREE TWO ONE (Sinjin Hawke Bootleg) 75.json"),
        await jsonGetter("midi_to_json/data/Tiara Goonie - All Out Of Time (Zora Jones Bootleg) 80.json"), // CANT BURN ME ZORA FLIP 
        await jsonGetter("midi_to_json/data/Tyga & Megan Thee Stallion - Freak (Sinjin SH Refix) 52.50.json"), //SINJIN MEGAN D STALLION 
        await jsonGetter("midi_to_json/data/Lil B - Dreams (Sinjin Hawke & Zora Jones Edit) 94.json"),
        await jsonGetter("midi_to_json/data/Barrington Levy - She Give Me Love (Sinjin Hawke Edit) 96.json"),
        await jsonGetter("midi_to_json/data/Masters At Work - Work (Bootyspoon Club Edit) 66.0.json"),

        await jsonGetter("midi_to_json/data/Bambounou - Any Other Service (Zora Jones Edit) 66.json"),
        await jsonGetter("midi_to_json/data/Camron ft Juelz Santana - Oh Yeah (Sinjin Hawke Edit) 76.50.json"),
        await jsonGetter("midi_to_json/data/Ski Mask The Slump God x Wiley - Fire Hydrant (FF Edit) 72.50.json"),
        await jsonGetter("midi_to_json/data/Trina - Fuck Love (Sinjin Hawke Edit) 73.json"),
        await jsonGetter("midi_to_json/data/Xza x SouljaBoy - Steamy Boy Swag (Martyn Bootyspoon Edit) 62.50.json"),

    ];
    //console.log(audioBeats);

    if (useAudioBeats) {

        //console.log("initAudioBeats");
        initAudioBeats();
        currentAudioElement = useSoundCloudPlayer ? ffplayer.streamAudioElement : ffplayer.song;
        audioBeatsLoaded = true;
        syncBeats();
    }
}



var lookConfigs = {

    "grey": {
        "light1": {
            "color": '0xb5c1ff',
            "intensity": 2.0,
        },
        "light2": { //pointlight
            "color": '0xffffff',
            "intensity": 0.70,
        },
        "tube": {
            "color": 0xFF0000,
            "opacity": 0.5,
        },
    },

    "green": {
        "light1": {
            "color": '0x04ff00',
            "intensity": 2.0,
        },

        "light2": {
            "color": '0x6fff00', //yellow
            "intensity": 2.0,
        },
        "tube": {
            "color": 0xffffff,
            "opacity": 0.2,
        },
    },


    "redblue": {
        //directional
        "light1": {
            "color": '0x0000ff',
            "intensity": 2.0,
        },

        //pointlight
        "light2": {
            "color": '0xff0000',
            "intensity": 1.0,
        },
        "tube": {
            "color": 0x7164b4,
            "opacity": 0.5,
        },
    },

    "blueblue": {
        //directional
        "light1": {
            "color": '0x0000ff',
            "intensity": 1.0,
        },

        //pointlight
        "light2": {
            "color": '0x0000ff',
            "intensity": 1.0,
        },
        "tube": {
            "color": 0x7164b4,
            "opacity": 0.5,
        },
    },

    "redred": {
        //directional
        "light1": {
            "color": '0xff0000',
            "intensity": 1.0,
        },

        //pointlight
        "light2": {
            "color": '0xff1900',
            "intensity": 1.0,
        },
        "tube": {
            "color": 0x7164b4,
            "opacity": 0.5,
        },
    },

    "pink": {
        "light1": {
            "color": '0xff0088',
            "intensity": 2.0,
        },
        "light2": {
            "color": '0x0000ff',
            "intensity": 1.3,
        },
        "tube": {
            "color": 0x7164b4,
            "opacity": 0.5,
        },
    },
    "pink orange": {
        "light1": {
            "color": '0xff0088',
            "intensity": 1.0,
        },
        "light2": {
            "color": '0xf46636',
            "intensity": 0.99,
        },
        "tube": {
            "color": 0x7164b4,
            "opacity": 0.5,
        },
    },

    "bb blue": {
        "light1": {
            "color": '0x009fff',
            "intensity": 1.6,
        },
        "light2": { //pointlight
            "color": '0xff0067',
            "intensity": 1.70,
        },
        "tube": {
            "color": 0xFF0000,
            "opacity": 0.5,
        },
    },

    "easter": {
        "light1": {
            "color": '0x00f2f9',
            "intensity": 1.0,
        },
        "light2": { //pointlight
            "color": '0xf1fb9f',
            "intensity": 0.70,
        },
        "tube": {
            "color": 0xFF0000,
            "opacity": 0.5,
        },
    },

    "neon green": {
        "light1": {
            "color": '0x00ff11',
            "intensity": 2.0,
        },

        "light2": {
            "color": '0x58fd74', //blue
            "intensity": 2.0,
        },
        "tube": {
            "color": 0xffffff,
            "opacity": 0.2,
        },
    },
    "barbi castle": {
        "light1": {
            "color": '0xff00b4',
            "intensity": 2.0,
        },

        "light2": {
            "color": '0xfd58b4', //blue
            "intensity": 2.0,
        },
        "tube": {
            "color": 0xffffff,
            "opacity": 0.2,
        },
    },
    "tequilla sunrise": {
        "light1": {
            "color": '0xA300FF',
            "intensity": 2.0,
        },

        "light2": {
            "color": '0xff5a00', //blue
            "intensity": 2.0,
        },
        "tube": {
            "color": 0xffffff,
            "opacity": 0.2,
        },
    },


    "pinkblue": {
        "light1": {
            "color": '0xff00b4',
            "intensity": 2.0,
        },

        "light2": {
            "color": '0x0051ff', //blue
            "intensity": 2.0,
        },
        "tube": {
            "color": 0xffffff,
            "opacity": 0.2,
        },
    },

    "white orange": {
        "light1": {
            "color": '0xb5c1ff',
            "intensity": 2.0,
        },

        "light2": {
            "color": '0xFF3300', //blue
            "intensity": 4.0,
        },
        "tube": {
            "color": 0xffffff,
            "opacity": 0.2,
        },
    },
    "orange green": {
        "light1": {
            "color": '0x00ff11',
            "intensity": 2.0,
        },

        "light2": {
            "color": '0xFF3300', //blue
            "intensity": 4.0,
        },
        "tube": {
            "color": 0xffffff,
            "opacity": 0.2,
        },
    },

};


var songLookMap = {


    0: "grey",
    1: "green",
    2: "redblue",
    3: "white orange",
    4: "redred",
    5: "barbi castle",
    6: "grey",
    7: "neon green",
    8: "orange green",
    // 9: "blueblue",
    9: "bb blue",
    10: "tequilla sunrise",
    11: "grey",
    12: "green",
    13: "redblue",
    14: "blueblue",
    15: "redred",
    16: "pink",
    17: "tequilla sunrise",
    18: "blueblue",
    19: "redblue",
    20: "white orange",
    21: "pinkblue",
    22: "pink",
    23: "grey",
    24: "green",
    25: "redblue",
    26: "blueblue",
    27: "redred",
    28: "pink",
    29: "grey",
    30: "green",
    31: "pink",
    32: "redred",
    33: "pink",
    34: "grey",
    35: "green",
    36: "pink",






};

var positionShroom = {

    0: new THREE.Vector3(-0, 36, -80), //dancefloor
    1: new THREE.Vector3(-180, 45, 30), //booth
    2: new THREE.Vector3(280, 38, -200), //left corner
    3: new THREE.Vector3(50, 39, 70), //bar
    4: new THREE.Vector3(280, 38, 20), //right corner
    5: new THREE.Vector3(-180, 34, -220), //next to booth

}

var jumpDelta;
var shroomIndex = 0;
var songIndex = 0;
var light1Intensity, light2Intensity;

function setLights(light1, light2, tube) {

    var color1 = light1["color"];
    var color2 = light2["color"];
    light1Intensity = light1["intensity"];
    light2Intensity = light2["intensity"];

    setColor(game.colorLight.color, color1);
    setColor(game.sun2.color, color2);
    // setColor( game.tubes.material.color, tube);
    game.colorLight.intensity = light1Intensity;
    game.sun2.intensity = light2Intensity;

    // game.tubes.material.opacity = tube[ "opacity" ];
    // game.tubes.material.color = new THREE.Color(tube[ "color" ]);

}

function setColor(color, value) {

    if (value === undefined) return;
    if (value.length === 3) {
        color.setHSL(value[0], value[1], value[2]);
    } else {

        color.setHex(value);
        // console.log("tube", game.tubes.material.color);

    }

}


var lookList = [];
var lookIdToIndex = {};



for (var id in lookConfigs) {

    lookIdToIndex[id] = lookList.length;

    lookConfigs[id]["label"] = id;
    // console.log( "lookIdToIndex[ id ]", lookIdToIndex[ id ]);
    lookList.push(lookConfigs[id]);

}

// console.log( "Number of looks", lookList.length );




var currentLookId = songLookMap[0];
var currentLookIndex = lookIdToIndex[currentLookId];
var animsLoaded = false;
//


var stats = new Stats();
//  stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom

const loadingManager = new THREE.LoadingManager(() => {

    const loadingScreen = document.getElementById('loading-screen');


    if (!loadingScreenFaded) {
        loadingScreen.classList.add('fade-out');
        // console.log(anims);
        game.player.action = animsLookup[0]; //idle
        loadingScreen.addEventListener('transitionend', onTransitionEnd);
        loadingScreen.addEventListener('transitionstart', onTransitionStart);

        loadingScreenFaded = true;

        // if (isIframe) {
        //     // showButton();
        // } else {
        //     console.log('not iframe');
        // }



    }


});
// const loader2 = new THREE.FBXLoader2( loadingManager );
const loaderGLTF = new THREE.GLTFLoader(loadingManager);
THREE.ShaderLib['lambert'].fragmentShader = THREE.ShaderLib['lambert'].fragmentShader.replace(

    `vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;`,

    `#ifndef CUSTOM
                  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
              #else
                  vec3 outgoingLight = diffuseColor.rgb * ( 1.0 - 0.5 * ( 1.0 - getShadowMask() ) ); // shadow intensity hardwired to 0.5 here
              #endif`

);
var youtube;

function switchAudioModes(data) {
    console.log(data);
    if (kicked) return;

    //if(twitchMode)return;

    if (data === "audio") {

        console.log("switching to audio");


        // if (game.screen !==undefined){
        // 	game.screen.visible = true;
        // }
        game.cssobject.visible = false;
        game.webglrepresentation.visible = false;

        if (youtubePlayer !== undefined) {
            youtubePlayer.stopVideo();
        }
        if (twitchPlayer !== undefined) {
            twitchPlayer.pause();
        }
        clearInterval(displayYoutube);
        clearInterval(changeLooks);
        $("#css").css("display", "none");
        youtubeMode = false;
        twitchMode = false;
        youtubeIsPlaying = false;

        if (!ffplayerLoaded) {
            initPlayer();
        }
        // if (!useAudioAnalysis){
        // 	useAudioAnalysis = true;
        // 	initAudioAnalysis();
        // }
        if (!useAudioBeats) {
            useAudioBeats = true;
            initAudioBeats();
        }

        if (audioBeatsLoaded) {
            syncBeats();
        }
        //ffplayer.playSong(songIndex);
        ffplayer.song.setVolume(0.8);
        playInitialized = false;
        // useAudioAnalysis = true;
        // useAudioBeats = true;
        ffplayer.playButton.click();
        enginesStarted = false;

        $("#css").css("display", "none");
        $("#youtubeDiv").width(0).height(0);
        $("iframe").css("display", "none");
        game.screen.visible = true;
        game.cssobject.visible = false;
        game.webglrepresentation2.visible = false;
        game.webglrepresentation.visible = false;
        game.cssobject.visible = false;
        game.cssobject2.visible = false;

        if (twitchPlayer !== undefined) {
            twitchPlayer.destroy();
            twitchLoaded = false;
        }

    } else if (data === "yt") {

        console.log("switching to youtube");
        //game.player.action = 'Idle'; //idle

        youtubeMode = true;
        twitchMode = false;

        game.cssobject2.visible = false;

        if (twitchPlayer !== undefined) {
            twitchPlayer.destroy();
            twitchLoaded = false;
        }
        if (!youtubeApiLoaded && loadingScreenFaded) {
            loadYouTubeApi();
        }

        ffplayer.stop();
        playInitialized = false;
        $("#youtubeDiv").css("display", "block");
        $("#YOUTUBE").css("display", "block");

        // setTimeout(function(){ 
        // 	youtubePlayer.playVideo();
        // }, 3000);
        //	youtubePlayer.playVideo();
        // $("#songlog").append("<h></h><br>");
        // $("#songlog").scrollTop($("#songlog")[0].scrollHeight);
        // // $("#songlog").
        // $("#songlog").show();

        showTitle("");

        playYoutube();



        //changeLooks = setInterval(nextLook, 10000);
        //GREYSCALE
        setLook(0);
        enginesStarted = false;

    } else if (data === "twitch") {

        console.log("switching to twitch");
        game.twitchdiv.visible = true;
        if (youtubePlayer !== undefined) {
            youtubePlayer.stopVideo();
        }
        if (ffplayer !== undefined) {
            ffplayer.stop();
        }
        if (youtubePlayer !== undefined) {
            $("#YOUTUBE").css("display", "none");
            $("#youtubeDiv").width(0).height(0);

        }

        //     youtubePlayer.destroy();



        youtubeMode = false;
        twitchMode = true;
        // youtubeApiLoaded = false;
        playInitialized = false;


        showTitle("starting stream");




        //GREYSCALE
        setLook(0);
        //COLORFUL
        //changeLooks = setInterval(nextLook, 10000);

    } else {
        console.log("value not boolean (true/false), try removing quotes");
    }
}

class Game {
    constructor() {

        this.modes = Object.freeze({
            NONE: Symbol("none"),
            PRELOAD: Symbol("preload"),
            INITIALISING: Symbol("initialising"),
            CREATING_LEVEL: Symbol("creating_level"),
            ACTIVE: Symbol("active"),
            GAMEOVER: Symbol("gameover")
        });
        this.mode = this.modes.NONE;
        // this.container;
        // this.player;
        // this.cameras;
        // this.camera;
        // this.scene;
        // this.controls;
        // this.mouse;

        // this.speechBubble;
        // this.chatBubble;

        // this.renderer;
        this.animations = {};
        this.assetsPath = 'assets/';

        this.remotePlayers = [];
        this.remoteColliders = [];
        this.djEquipment = [];
        this.initialisingPlayers = [];
        this.remoteData = [];

        this.messages = {
            text: [
                "Welcome to Fractal C L U B",
                // "GOOD LUCK!"
            ],
            index: 0
        }

        if (isMobile) {
            this.container = document.createElement('div');
            this.container.setAttribute("id", "joystickContainer");
            this.container.style.height = '100%';
            document.body.appendChild(this.container);
        }

        document.body.appendChild(stats.domElement);
        // const sfxExt = SFX.supportsAudioType('mp3') ? 'mp3' : 'ogg';

        const game = this;

        // this.newDt = 0;
        this.previousTime = 0;
        this.anims = [
            'Idle', //0
            'Running', //1
            'Walking Backwards', //2
            'Running Forward Flip', //3
            'Left Turn', //4
            'Dancing Twerk', //5
            '2 Twerk', //6
            '3 Twerk', //7
            '6 Twerk', //8
            '7 Twerk', //9
            '5 Twerk', //10
        ];

        this.sound = new Howl({
            src: ['mp3/soundfx.mp3'],
            sprite: {
                powerup: [0, 11000],
                hit: [12850, 1360],
                lickshots: [15100, 2360],
                acid: [21050, 12000],
                nothing: [11000, 1360]
            },
            volume: 0.35,
        });


        // game.soundNothing = game.sound.play('nothing');
        // game.soundPowerup = game.sound.play('powerup');
        // game.soundLickshots = game.sound.play('lickshots');


        // this.sound.on('end', function() {
        //     console.log('Finished!');
        // });  

        // var MsgType = {
        // 	"Idle": String.fromCharCode(0),
        // 	"Walking": String.fromCharCode(1),
        // 	"Walking Backwards": String.fromCharCode(2),
        // 	"Running Forward Flip": String.fromCharCode(3),
        // 	"Running": String.fromCharCode(4),
        // 	"Left Turn": String.fromCharCode(5),
        // 	'Dancing Twerk':String.fromCharCode(6),
        // };

        // this.animsLookup = {
        // 	1: 'Idle', 
        // 	2: 'Walking', 
        // 	3: 'Walking Backwards', 
        // 	4: 'Running Forward Flip',
        // 	5: 'Running', 
        // 	6: 'Left Turn', 
        // 	7: 'Dancing Twerk', 

        // };




        // 'Talking', 'Pointing Gesture'

        // const options = {
        // 	assets:[
        // 		`${this.assetsPath}images/pano.jpg`,
        // 		`${this.assetsPath}images/name.png`
        // 	],
        // 	oncomplete: function(){
        // 		game.init();

        // 		setTimeout(function(){ 
        // 			// selected = true;
        // 			// $("#nameInput").click().focus();
        // 			// $("#nameInput").select();


        // 		}, 100);

        // 	}
        // }
        // console.log(anims);
        // anims.forEach( function(anim){ options.assets.push(`${game.assetsPath}fbx/anims/${anim}.fbx`)});


        // options.assets.push(`${game.assetsPath}fbx/environment3.fbx`);
        //options.assets.push(`${game.assetsPath}fbx/people/Brosef.fbx`);

        // this.mode = this.modes.PRELOAD;
        // const preloader = new Preloader(options);




        this.mode = this.modes.NONE;



        // game.init();
        this.clock = new THREE.Clock();



        window.onError = function (error) {
            console.error(JSON.stringify(error));
        }
    }



    set activeCamera(object) {
        // console.log('setCamera')
        this.cameras.active = object;
        this.camTarget = new THREE.Vector3(0, 22.0, 0);
        if (isMobile) {
            this.camPosition = this.cameras.active.getWorldPosition(this.camTarget);
        } else {
            this.camPosition = game.controls.object.getWorldPosition(this.camTarget);
        }
    }





    init() {

        if (!youtubeMode) {
            initPlayer();
        }

        const game = this;
        this.mode = this.modes.INITIALISING;

        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 800);


        this.camera.updateMatrix(); // make sure camera's local matrix is updated
        this.camera.updateMatrixWorld(); // make sure camera's world matrix is updated
        this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();
        this.frustum = new THREE.Frustum();





        this.rotation = 0;





        this.camera.position.set(0, 30, 20);

        this.mouse = new THREE.Vector2();

        this.scene = new THREE.Scene();

        //// CREATE CSS SCENE

        game.cssscene = new THREE.Scene();
        game.cssrenderer = new THREE.CSS3DRenderer();
        game.cssrenderer.setSize(window.innerWidth, window.innerHeight);
        game.cssrenderer.domElement.style.zIndex = 1;
        document.querySelector('#css').appendChild(game.cssrenderer.domElement);



        //// ADD TWITCH

        game.twitchdiv = document.getElementById('twitchDiv'),
            game.cssobject2 = new THREE.CSS3DObject(game.twitchdiv);
        game.cssobject2.position.set(-255, 60, -72);
        game.cssobject2.rotation.y = 1.55;
        game.cssobject2.scale.set(0.35, 0.35, 0.35);
        game.occlusionMaterial2 = new THREE.MeshBasicMaterial({
            opacity: 0.0,
            transparent: true,
            color: new THREE.Color('black'),
            blending: THREE.NoBlending,
            side: THREE.DoubleSide,
        });
        game.webglrepresentation2 = new THREE.Mesh(new THREE.PlaneGeometry(480, 360), game.occlusionMaterial2);
        game.webglrepresentation2.position.copy(game.cssobject2.position);
        game.webglrepresentation2.rotation.copy(game.cssobject2.rotation);
        game.webglrepresentation2.scale.copy(game.cssobject2.scale);

        game.scene.add(game.webglrepresentation2);
        game.cssscene.add(game.cssobject2);

        game.webglrepresentation2.visible = false;





        // ADD YOUTUBE
        this.videodiv = document.getElementById('youtubeDiv'),
            this.videodiv.style.width = '480px';
        this.videodiv.style.height = '360px';
        this.videodiv.style.backgroundSize = 'contain';
        this.videodiv.style.backgroundPosition = "center";
        this.videodiv.style.backgroundRepeat = 'no-repeat';
        //   console.log("YOUTUBE DIV CREATED");

        this.cssobject = new THREE.CSS3DObject(this.videodiv);
        this.cssobject.position.set(-255, 60, -72);
        this.cssobject.rotation.y = 1.55;
        this.cssobject.scale.set(0.35, 0.35, 0.35);
        this.cssscene.add(this.cssobject);

        this.occlusionMaterial = new THREE.MeshBasicMaterial({
            opacity: 0.0,
            transparent: true,
            color: new THREE.Color('black'),
            blending: THREE.NoBlending,
            side: THREE.DoubleSide,
        });
        this.webglrepresentation = new THREE.Mesh(new THREE.PlaneGeometry(480, 360), this.occlusionMaterial);
        this.webglrepresentation.position.copy(this.cssobject.position);
        this.webglrepresentation.rotation.copy(this.cssobject.rotation);
        this.webglrepresentation.scale.copy(this.cssobject.scale);

        this.scene.add(this.webglrepresentation);
        this.cssscene.add(this.cssobject);

        game.webglrepresentation.visible = false;

        //ADD LIGHTS

        const colorLight = new THREE.DirectionalLight(0x0000ff, 1.0);
        var phelper = new THREE.DirectionalLightHelper(colorLight, 3);
        colorLight.position.set(180, 50, -180);
        this.scene.add(colorLight);

        var plight2 = new THREE.PointLight(0xffffff, 0.1, 0, 1);
        var phelper2 = new THREE.PointLightHelper(plight2, 3);

        this.scene.add(plight2);

        this.colorLight = colorLight;
        this.sun2 = plight2;

        this.loadEnvironment(loaderGLTF);

        this.player = new PlayerLocal(this);

        this.player.points = 0;
        this.player.shroomActivated = false;
        this.player.jumpTime = 0.0;
        this.player.isJumping = false;

        if (isMobile) {
            var joystick = new VirtualJoystick({
                // onMove: this.playerControl,
                onMove: this.playerControl,
                game: this,
                limitStickTravel: true,
                mouseSupport: false,
                container: document.getElementById('joystickContainer'),
                strokeStyle: "white",
                // mouseSupport: true,
                // stickRadius: 400,
            });
            joystick.addEventListener('touchStart', function () {
                // console.log('down')
                game.danceStart();
                mousedown = true;

                // if()
            })
            joystick.addEventListener('touchEnd', function () {
                // console.log('up')
                game.danceStop();
                mousedown = false;
            })
        }

        // if (!isMobile){
        // 	document.getElementById("Thumb").style.display = "none";
        // }; 


        //document.getElementById("Thumb").style.opacity = 0.0;

        let pixelRatio = window.devicePixelRatio
        let AA = true
        if (pixelRatio > 1) {
            AA = false
        }

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: AA,
            powerPreference: "high-performance",
        })
        this.renderer.domElement.style.background = ''
        this.renderer.domElement.style.zIndex = 0;
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.domElement.id = "webglCanvas";
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = false;

        const acidGeometry = new THREE.PlaneBufferGeometry(6, 8);
        this.acidMesh = new THREE.Mesh(acidGeometry, this.shroomPsyMaterial2b);
        game.scene.add(this.acidMesh);
        game.acidMesh.name = "acidMesh";
        game.acidMesh.position.set(-200, 40, 90);
        game.acidMesh.geometry.computeBoundingBox();


        const dubplateGeometry = new THREE.CircleBufferGeometry(2, 32);
        this.dubplateMesh = new THREE.Mesh(dubplateGeometry, this.downloadMaterial);
        game.scene.add(this.dubplateMesh);
        game.dubplateMesh.name = "dubplateMesh";
        game.dubplateMesh.position.set(-140, 80, -80);
        game.dubplateMesh.geometry.computeBoundingBox();

        //   const dubplateGeometry2 = new THREE.CircleBufferGeometry(2, 32);
        this.dubplateMesh2 = new THREE.Mesh(dubplateGeometry, this.downloadMaterial);
        game.scene.add(this.dubplateMesh2);
        game.dubplateMesh2.name = "dubplateMesh2";
        game.dubplateMesh2.position.set(290, 40, 50);
        game.dubplateMesh2.geometry.computeBoundingBox();

        this.dubplateMesh3 = new THREE.Mesh(dubplateGeometry, this.downloadMaterial);
        game.scene.add(this.dubplateMesh3);
        game.dubplateMesh3.name = "dubplateMesh3";
        game.dubplateMesh3.position.set(20, 45, -220);
        game.dubplateMesh3.geometry.computeBoundingBox();

        loaderGLTF.load(
            // resource URL
            'assets/fbx/shroom.glb',
            // called when the resource is loaded
            function (shroom) {
                game.shroom = shroom;
                game.scene.add(shroom.scene);
                game.shroom.scene.position.set(positionShroom[shroomIndex].x, positionShroom[shroomIndex].y, positionShroom[shroomIndex].z);

                shroom.scene.traverse(function (child) {
                    if (child.isMesh) {

                        child.material = game.shroomMaterial;
                        child.geometry.computeBoundingBox();

                    }

                })

            }

        )

        document.querySelector('#webgl').appendChild(this.renderer.domElement);

        if (!isMobile) {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        }



        window.addEventListener("touchstart", touchHandler, true);
        window.addEventListener("touchmove", touchHandler, true);
        window.addEventListener("touchend", touchHandler, true);
        window.addEventListener("touchcancel", touchHandler, true);

        window.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        window.addEventListener("orientationchange", () => game.onOrientationChange(), false);
        window.addEventListener('resize', () => game.onWindowResize(), false);
        window.addEventListener("keydown", (event) => game.onKeyDown(event), false);
        window.addEventListener("keyup", (event) => game.onKeyUp(event), false);
        // document.addEventListener('focusout', event => { onFocusOut(event), false });



        // function onFocusOut(event) {
        // 	// console.log('focus out')
        // 	game.danceStop();
        // 	game.playerControl(0, 0);
        // }

        if (isMobile) {
            $(window).focus(function () {
                //do something
                twitchPlayer.play();
                //$("#unmute").css("display", "block");
                console.log('focus');
            });

            $(window).blur(function () {
                //do something
                twitchPlayer.pause();
                twitchPlayer.setMuted(true);
                console.log('blur');
            });
        }

        var xDown = null,
            yDown = null,
            xUp = null,
            yUp = null;

        function getTouches(event) {
            return event.touches || // browser API
                event.originalEvent.touches; // jQuery
        }

        function touchHandler(event) {
            // event.preventDefault();
            var touches = event.changedTouches,
                first = touches[0],
                type = "";
            switch (event.type) {
                case "touchstart":

                    mousedown = true;
                    game.danceStart();
                    $("#webgl").click();
                    if (!enginesStarted) {
                        startEngines();
                        enginesStarted = true;
                    }

                    // // create empty buffer
                    // var buffer = window.AudioContext.createBuffer(1, 1, 22050);
                    // var source = window.AudioContext.createBufferSource();
                    // source.buffer = buffer;

                    // // connect to output (your speakers)
                    // source.connect(window.AudioContext.destination);

                    // // play the file
                    // source.noteOn(0);
                    // if (!twitchLoaded){
                    // 	twitch();
                    // } 
                    // if (twitchIsPlaying){
                    // 	twitchPlayer.setMuted(false);
                    // 	twitchPlayer.setVolume(1)
                    // 	console.log("unmute, set volume");

                    // }


                    const firstTouch = (event.touches || event.originalEvent.touches)[0];
                    xDown = firstTouch.clientX;
                    yDown = firstTouch.clientY;
                    type = "mousedown";
                    game.intersectThings(xDown, yDown);

                    break;


                case "touchmove":



                    // if(joystick.stickNormalizedX===undefined)return;
                    if (selected) return;
                    // startEngines();
                    // console.log(joystick.stickNormalizedX,joystick.stickNormalizedY);

                    // turn = joystick.stickNormalizedX;


                    turn = joystick.deltaX() / 100;
                    fwd = -joystick.deltaY() / 100;



                    if (turn > 1) { turn = 1 };
                    if (turn < -1) { turn = -1 };

                    if (fwd > 1) { fwd = 1 };
                    if (fwd < -1) { fwd = -1 };
                    // if (fwd>1 | fwd<-1){fwd=0};
                    // if (jump===undefined){jump=false};
                    // console.log({turn});

                    // console.log(fwd, turn);
                    // game.player.motion = { fwd, turn };
                    game.playerControl(fwd, turn);
                    // game.playerControl(fwd,0,jump);


                    if (!xDown || !yDown) return;
                    xUp = event.touches[0].clientX;
                    yUp = event.touches[0].clientY;

                    // game.onMouseDown(event);

                    type = "mousemove";
                    break;
                case "touchend":
                    // console.log(yUp);
                    mousedown = false;
                    game.danceStop();
                    game.playerControl(0, 0);

                    var xDiff = xUp - xDown,
                        yDiff = yUp - yDown;
                    if ((Math.abs(xDiff) > Math.abs(yDiff)) && (Math.abs(xDiff) > 0.33 * document.body.clientWidth)) {


                        // if (xDiff < 0) { }
                        // //document.getElementById('leftnav').click();
                        // // console.log("left");
                        // else { }
                        // //document.getElementById('rightnav').click();
                        // // console.log("right");
                    } else {
                        if (yDiff > 0) {
                            // game.playerControl(0,0,false);
                            // console.log("down");
                        } else if (yDiff < -200) {
                            // console.log("up fast");
                            // console.log(yDiff)
                            // game.player.jump = true;
                            // jump = 1;

                            jumpUp();
                            canJump = true;
                            // game.playerControl(fwd,turn);
                            // game.playerControl(0,0);

                            // game.player.move();
                            // console.log(game.player.object);
                            // const dt = game.clock.getDelta();

                        } else {
                            // console.log("up");

                        }
                    }
                    xDown = null, yDown = null;

                    type = "mouseup";;
                    break;
                default:
                    return;
            }

            // initMouseEvent(type, canBubble, cancelable, view, clickCount, 
            //                screenX, screenY, clientX, clientY, ctrlKey, 
            //                altKey, shiftKey, metaKey, button, relatedTarget);

            // var simulatedEvent = document.createEvent("MouseEvent");
            // simulatedEvent.initMouseEvent(type, true, true, window, 1, 
            // 							first.screenX, first.screenY, 
            // 							first.clientX, first.clientY, false, 
            // 							false, false, false, 0/*left*/, null);

            // first.target.dispatchEvent(simulatedEvent);

            // // alert(event.target.tagName);
            // // console.log(event.target.tagName);

            // 	if (event.target.tagName != 'INPUT') {
            // 		// event.preventDefault();

            // 	}


            // event.preventDefault();

        }


    }




    loadEnvironment(loader) {
        const game = this;



        this.whiteTexture = new THREE.TextureLoader().load('assets/images/matcap/noshame22.jpg');

        this.blackTexture = new THREE.TextureLoader().load('assets/images/matcap/bussgun.jpg'); // 0 <3 main black
        document.querySelector("label[for=line0]").style.backgroundImage = "url('assets/images/matcap/bussgun.jpg')";
        // this.chromeTexture = new THREE.TextureLoader().load('assets/images/matcap/matcap00.jpg'); //1  <3
        // document.querySelector("label[for=line1]").style.backgroundImage = "url('assets/images/matcap/matcap00.jpg')";
        this.chromeTexture2 = new THREE.TextureLoader().load('assets/images/matcap/dont10.jpg'); //2 <3
        document.querySelector("label[for=line1]").style.backgroundImage = "url('assets/images/matcap/dont10.jpg')";
        this.chromeTexture3 = new THREE.TextureLoader().load('assets/images/matcap/noshame13.jpg'); //3  white
        document.querySelector("label[for=line2]").style.backgroundImage = "url('assets/images/matcap/noshame13.jpg')";
        this.chromeTexture4 = new THREE.TextureLoader().load('assets/images/matcap/matcap02.jpg'); //4 <3
        document.querySelector("label[for=line3]").style.backgroundImage = "url('assets/images/matcap/matcap02.jpg')";
        this.chromeTexture5 = new THREE.TextureLoader().load('assets/images/matcap/matcap04.jpg'); //5  maybe
        document.querySelector("label[for=line4]").style.backgroundImage = "url('assets/images/matcap/matcap04.jpg')";
        // this.chromeTexture6 = new THREE.TextureLoader().load('assets/images/matcap/black2.jpg'); //6 
        // document.querySelector("label[for=line6]").style.backgroundImage = "url('assets/images/matcap/black2.jpg')";
        this.chromeTexture7 = new THREE.TextureLoader().load('assets/images/matcap/money13.jpg'); //7 <3
        document.querySelector("label[for=line5]").style.backgroundImage = "url('assets/images/matcap/money13.jpg')";
        this.chromeTexture8 = new THREE.TextureLoader().load('assets/images/matcap/noshame4.jpg'); //8 <3
        document.querySelector("label[for=line6]").style.backgroundImage = "url('assets/images/matcap/noshame4.jpg')";
        // this.chromeTexture9 = new THREE.TextureLoader().load('assets/images/matcap/theZone.jpg'); //9  
        // document.querySelector("label[for=line9]").style.backgroundImage = "url('assets/images/matcap/theZone.jpg')";
        this.chromeTexture10 = new THREE.TextureLoader().load('assets/images/matcap/moneyvip6.jpg'); //10 <3
        document.querySelector("label[for=line7]").style.backgroundImage = "url('assets/images/matcap/moneyvip6.jpg')";
        // this.chromeTexture11 = new THREE.TextureLoader().load('assets/images/matcap/moneyvip2.jpg'); //11 <3
        // document.querySelector("label[for=line11]").style.backgroundImage = "url('assets/images/matcap/moneyvip2.jpg')";
        this.greenTexture = new THREE.TextureLoader().load('assets/images/matcap/duncan5.jpg'); // <3
        document.querySelector("label[for=line8]").style.backgroundImage = "url('assets/images/matcap/duncan5.jpg')";

        this.fflogoTexture = new THREE.TextureLoader().load('assets/images/fflogo.jpg');

        this.blackMaterial = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.blackTexture, skinning: true });
        this.whiteMaterial = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.whiteTexture, skinning: true });
        this.silverMaterial = new THREE.MeshMatcapMaterial({ color: 0x999999, matcap: this.whiteTexture, skinning: true });
        this.greenMaterial = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.greenTexture, skinning: true });
        // this.chromeMaterial = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture, skinning: true });
        this.chromeMaterial2 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture2, skinning: true });
        this.chromeMaterial3 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture3, skinning: true });
        this.chromeMaterial4 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture4, skinning: true });
        this.chromeMaterial5 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture5, skinning: true });
        // this.chromeMaterial6 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture6, skinning: true });
        this.chromeMaterial7 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture7, skinning: true });
        this.chromeMaterial8 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture8, skinning: true });
        // this.chromeMaterial9 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture9, skinning: true });
        this.chromeMaterial10 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture10, skinning: true });
        // this.chromeMaterial11 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture11, skinning: true });

        this.laserMaterial = new THREE.MeshBasicMaterial({ color: 1179392, visible: true });
        this.eyesMaterial = new THREE.MeshBasicMaterial({ color: 0xff0400 });




        this.shroomMaterial = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.blackTexture, skinning: true, visible: true });
        this.debugMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, skinning: true })
        this.debugMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000, })
        this.screenMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.FrontSide,
            map: this.fflogoTexture,

        })
        //flip fflogo


        // TEST PSY SHROOM MATERIAL

        this.shroomPsyMaterial1 = new THREE.MeshBasicMaterial({ color: 0x00ff00, skinning: true, side: THREE.DoubleSide, visible: true });

        this.shroomPsyMaterial1.onBeforeCompile = function (shader) {

            shader.uniforms.time = { value: 0 };

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_pars_vertex>`,
                `#ifdef UVS_VERTEX_ONLY
  
                          vec2 vUv;
  
                      #else
  
                          varying vec2 vUv;
  
                      #endif
  
                      uniform mat3 uvTransform;`

            );

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_vertex>`,
                `vUv = ( uvTransform * vec3( uv, 1 ) ).xy;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <uv_pars_fragment>`,
                `varying vec2 vUv;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(

                `uniform float opacity;`,
                `uniform float opacity;
                      uniform float time;`

            );
            shader.fragmentShader = shader.fragmentShader.replace(

                `vec3 outgoingLight = reflectedLight.indirectDiffuse;`,

                // `
                // //vec2 position = ( gl_FragCoord.xy / 100.0 );
                // vec3 p = vec3( vUv, sin(time*0.01));
                // for (int i = 0; i < 40; i++) {
                //     p.zyx = abs(( abs(p)/dot(p,p) - vec3(1.0,1.0, sin(time*0.1)* 0.6)));
                // }

                // vec3 outgoingLight = p.zxy;`


                `
                      float t = time * 0.033;
  
                      // vec3 p = vec3( vUv, 2.0*sin(t*0.3)) ;                    
                      // for (int i = 0; i < 50; i++)
                      // {
                      //     //p.xzy = vec3(1.3,0.999,0.7)*(abs((abs(p)/dot(p,p)-vec3(1.0,1.0, sin(t*0.9+cos(t))*0.5))));
                      //     p.xzy = vec3(1.3,0.999,0.7)*(abs((abs(p)/dot(p,p)-vec3(1.0,1.0, ( sin(time*0.3)+cos(time*0.2) ) * 0.1))));
                      // } 
  
                      vec3 p = vec3((gl_FragCoord.xy)/(resolution.y), 2.0*( cos(time*0.3)*sin(time*0.1) ));	
                      for (int i = 0; i < 40; i++)
                      {
                          p.xzy = vec3(1.3,0.999,0.7) * (abs((abs(p)/dot(p,p)-vec3(1.0,1.0, ( sin(time*0.3)+cos(time*0.2) ) * 0.1)))) + vec3(0.05,0.0,0.0);
                      }
                      
                      vec3 outgoingLight = p.xyz;`

            );


            game.shroomPsyMaterial1.userData.shader = shader;

        };

        // psy matcap material test
        this.shroomPsyMaterial2 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture3, side: THREE.DoubleSide, skinning: true });

        this.shroomPsyMaterial2.onBeforeCompile = function (shader) {

            shader.uniforms.time = { value: 0 };

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_pars_vertex>`,
                `#ifdef UVS_VERTEX_ONLY
  
                          vec2 vUv;
  
                      #else
  
                          varying vec2 vUv;
  
                      #endif
  
                      uniform mat3 uvTransform;`

            );

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_vertex>`,
                `vUv = ( uvTransform * vec3( uv, 1 ) ).xy;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <uv_pars_fragment>`,
                `varying vec2 vUv;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(

                `uniform float opacity;`,
                `uniform float opacity;
                      uniform float time;`

            );
            shader.fragmentShader = shader.fragmentShader.replace(

                `vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`,

                // `
                // //vec2 position = ( gl_FragCoord.xy / 100.0 );
                // vec3 p = vec3( vUv, sin(time*0.01));
                // for (int i = 0; i < 40; i++) {
                //     p.zyx = abs(( abs(p)/dot(p,p) - vec3(1.0,1.0, sin(time*0.1)* 0.6)));
                // }

                // vec3 outgoingLight = p.zxy;`


                `
                      float t = time * 0.033;
                      vec3 p = vec3( vUv, 2.0*sin(t*0.5)) ;
                      
                      for (int i = 0; i < 50; i++)
                      {
                          //p.xzy = vec3(1.3,0.999,0.7)*(abs((abs(p)/dot(p,p)-vec3(1.0,1.0, sin(t*0.9+cos(t))*0.5))));
                          p.xzy = vec3(1.3,0.999,0.7)*(abs((abs(p)/dot(p,p)-vec3(1.0,1.0, ( sin(time*0.3)+cos(time*0.2) ) * 0.1))));
                      } 
                      
                      //vec3 outgoingLight = mix(diffuseColor.rgb * matcapColor.rgb, p.xyz, 0.5);
                      vec3 outgoingLight = p.rgb * matcapColor.rgb;
                      `

            );


            game.shroomPsyMaterial2.userData.shader = shader;

        };

        // psy matcap material test
        this.shroomPsyMaterial2b = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture3, side: THREE.DoubleSide, skinning: true });

        this.shroomPsyMaterial2b.onBeforeCompile = function (shader) {

            shader.uniforms.time = { value: 0 };

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_pars_vertex>`,
                `#ifdef UVS_VERTEX_ONLY
   
                           vec2 vUv;
   
                       #else
   
                           varying vec2 vUv;
   
                       #endif
   
                       uniform mat3 uvTransform;`

            );

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_vertex>`,
                `vUv = ( uvTransform * vec3( uv, 1 ) ).xy;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <uv_pars_fragment>`,
                `varying vec2 vUv;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(

                `uniform float opacity;`,
                `uniform float opacity;
                       uniform float time;`

            );
            shader.fragmentShader = shader.fragmentShader.replace(

                `vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`,

                // `
                // //vec2 position = ( gl_FragCoord.xy / 100.0 );
                // vec3 p = vec3( vUv, sin(time*0.01));
                // for (int i = 0; i < 40; i++) {
                //     p.zyx = abs(( abs(p)/dot(p,p) - vec3(1.0,1.0, sin(time*0.1)* 0.6)));
                // }

                // vec3 outgoingLight = p.zxy;`


                `
                      float t = time * 0.033;
  
                      // variant 1
                      vec3 p = vec3( vUv, 2.0*sin(t*0.5)) ;				 
                      for (int i = 0; i < 50; i++)
                      {
                          //p.xzy = vec3(1.3,0.999,0.7)*(abs((abs(p)/dot(p,p)-vec3(1.0,1.0, sin(t*0.9+cos(t))*0.5))));
                          p.xzy = vec3(1.3,0.999,0.7)*(abs((abs(p)/dot(p,p)-vec3(1.0,1.0, ( sin(time*0.3)+cos(time*0.2) ) * 0.1))));                        
                      } 
  
                      // // alt variant 2 --- less bouncing
                      // vec3 p = vec3( vUv, 2.0*( cos(time*0.07)*sin(time*0.03) ));					 
                      // for (int i = 0; i < 50; i++)
                      // {
                      //     p.xzy = vec3(1.3,0.999,0.7) * (abs((abs(p)/dot(p,p)-vec3(1.0,1.0, ( sin(time*0.3)+cos(time*0.2) ) * 0.1)))) + vec3(0.05,0.0,0.0);
                      // } 
                       
                       //vec3 outgoingLight = mix(diffuseColor.rgb * matcapColor.rgb, p.xyz, 0.5);
                       vec3 outgoingLight = p.rgb * matcapColor.rgb;
                       `

            );


            game.shroomPsyMaterial2b.userData.shader = shader;

        };

        // waves + matcap material test
        this.shroomPsyMaterial3 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture2, skinning: true });

        this.shroomPsyMaterial3.onBeforeCompile = function (shader) {

            shader.uniforms.time = { value: 0 };

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_pars_vertex>`,
                `#ifdef UVS_VERTEX_ONLY
  
                          vec2 vUv;
  
                      #else
  
                          varying vec2 vUv;
  
                      #endif
  
                      uniform mat3 uvTransform;`

            );

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_vertex>`,
                `vUv = ( uvTransform * vec3( uv, 1 ) ).xy;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <uv_pars_fragment>`,
                `varying vec2 vUv;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(

                `uniform float opacity;`,
                `uniform float opacity;
                      uniform float time;
                      mat2 rotate(float a)
                      {
                          float c = cos(a);
                          float s = sin(a);
                          return mat2(c, s, -s, c);
                      }`

            );
            shader.fragmentShader = shader.fragmentShader.replace(

                `vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`,

                `
                      // original shader: https://glslsandbox.com/e#66691.0
                      float _time = time*0.1;
                      vec2 p = vUv*10.0;
                      vec2 i = p;
                      float c = 0.0;
                      float inten = 0.18;
                      float r = length(p+vec2(sin(_time),sin(_time*0.433+2.))*3.);
                      float d = length(p);
                      
                      for (float n = 0.0; n < 2.0; n++) {
                          p *= rotate(d+time+p.x*2.4)*-0.15;
                          float t = r-_time * (1.0 - (1.9 / (n+1.)));
                              t = r-_time/(n+0.6);
                          i -= p + vec2(
                              cos(t - i.x-r) + sin(t + i.y), 
                              sin(t - i.y) + cos(t + i.x)+r
                          );
                          c += 1.0/length(vec2(
                              (sin(i.x+t)/inten),
                              (cos(i.y+t)/inten)
                              )
                          );
                      
                      }
                      //c /= float(2.0);
                      
                      //vec3 outgoingLight = mix(diffuseColor.rgb * matcapColor.rgb, p.xyz, 0.5);
                      vec3 outgoingLight = vec3(c) * matcapColor.rgb;
                      `

            );


            game.shroomPsyMaterial3.userData.shader = shader;

        };


        // waves + BUMP + matcap material test
        this.shroomPsyMaterial4 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture2, skinning: true });

        this.shroomPsyMaterial4.onBeforeCompile = function (shader) {

            shader.uniforms.time = { value: 0 };

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_pars_vertex>`,
                `#ifdef UVS_VERTEX_ONLY
                          vec2 vUv;
                      #else
                          varying vec2 vUv;
                      #endif
                      uniform mat3 uvTransform;`
            );

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_vertex>`,
                `vUv = ( uvTransform * vec3( uv, 1 ) ).xy;`
            );

            shader.vertexShader = shader.vertexShader.replace(
                `#include <displacementmap_pars_vertex>`,
                `	// uniform sampler2D displacementMap;
                          uniform float displacementScale;
                          uniform float displacementBias;
                          uniform float time;
  
                          mat2 rotate(float a)
                          {
                              float c = cos(a);
                              float s = sin(a);
                              return mat2(c, s, -s, c);
                          }
                          
                          float getWaves( vec2 uv ) {
  
                              // original shader: https://glslsandbox.com/e#66691.0
                              float _time = time * 0.1;
                              vec2 p = uv * 10.0;
                              vec2 i = p;
                              float c = 0.0;
                              float inten = 0.18;
                              float r = length(p+vec2(sin(_time),sin(_time*0.433+2.))*3.);
                              float d = length(p);
                              
                              for (float n = 0.0; n < 2.0; n++) {
                                  p *= rotate(d+time+p.x*2.4)*-0.15;
                                  float t = r-_time * (1.0 - (1.9 / (n+1.)));
                                      t = r-_time/(n+0.6);
                                  i -= p + vec2(
                                      cos(t - i.x-r) + sin(t + i.y), 
                                      sin(t - i.y) + cos(t + i.x)+r
                                  );
                                  c += 1.0/length(vec2(
                                      (sin(i.x+t)/inten),
                                      (cos(i.y+t)/inten)
                                      )
                                  );
                              
                              }
                              // c /= float(2.0);
  
                              return c;
                          }
                          `
            );

            // // displace vertices with waves
            // shader.vertexShader = shader.vertexShader.replace(
            //     `#include <displacementmap_vertex>`,
            //     `transformed += normalize( objectNormal ) * ( getWaves(uv*0.1) * 0.2 + 0.0 );`
            // );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <uv_pars_fragment>`,
                `varying vec2 vUv;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `uniform float opacity;`,
                `uniform float opacity;
                      uniform float time;
                      mat2 rotate(float a)
                      {
                          float c = cos(a);
                          float s = sin(a);
                          return mat2(c, s, -s, c);
                      }`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <bumpmap_pars_fragment>`,

                `
                      float getWaves( vec2 uv ) {
  
                          // original shader: https://glslsandbox.com/e#66691.0
                          float _time = time * 0.1;
                          vec2 p = uv * 10.0;
                          vec2 i = p;
                          float c = 0.0;
                          float inten = 0.18;
                          float r = length(p+vec2(sin(_time),sin(_time*0.433+2.))*3.);
                          float d = length(p);
                          
                          for (float n = 0.0; n < 2.0; n++) {
                              p *= rotate(d+time+p.x*2.4)*-0.15;
                              float t = r-_time * (1.0 - (1.9 / (n+1.)));
                                  t = r-_time/(n+0.6);
                              i -= p + vec2(
                                  cos(t - i.x-r) + sin(t + i.y), 
                                  sin(t - i.y) + cos(t + i.x)+r
                              );
                              c += 1.0/length(vec2(
                                  (sin(i.x+t)/inten),
                                  (cos(i.y+t)/inten)
                                  )
                              );
                          
                          }
                          // c /= float(2.0);
  
                          return c;
                      }
  
  
                      // uniform sampler2D bumpMap;
                      uniform float bumpScale;
  
                      // Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
                      // http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf
  
                      // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)
  
                      vec2 dHdxy_fwd() {
  
                          vec2 dSTdx = dFdx( vUv );
                          vec2 dSTdy = dFdy( vUv );
  
                          // float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
                          // float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
                          // float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
  
                          float Hll = bumpScale * getWaves( vUv );
                          float dBx = bumpScale * getWaves( vUv + dSTdx ) - Hll;
                          float dBy = bumpScale * getWaves( vUv + dSTdy ) - Hll;
  
                          return vec2( dBx, dBy );
  
                      }
  
                      vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {
  
                          // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988
  
                          vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
                          vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
                          vec3 vN = surf_norm;		// normalized
  
                          vec3 R1 = cross( vSigmaY, vN );
                          vec3 R2 = cross( vN, vSigmaX );
  
                          float fDet = dot( vSigmaX, R1 );
  
                          fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );
  
                          vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
                          return normalize( abs( fDet ) * surf_norm - vGrad );
  
                      }`
            );


            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <normal_fragment_maps>`,

                `
                      #ifdef OBJECTSPACE_NORMALMAP
                          normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals
                          #ifdef FLIP_SIDED
                              normal = - normal;
                          #endif
                          #ifdef DOUBLE_SIDED
                              normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
                          #endif
                          normal = normalize( normalMatrix * normal );
                      #elif defined( TANGENTSPACE_NORMALMAP )
                          vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
                          mapN.xy *= normalScale;
                          #ifdef USE_TANGENT
                              normal = normalize( vTBN * mapN );
                          #else
                              normal = perturbNormal2Arb( -vViewPosition, normal, mapN );
                          #endif
                      #elif defined( USE_BUMPMAP )
  
                          // normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );
  
                      #endif
  
                      normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );
  
                      `
            );

            shader.fragmentShader = shader.fragmentShader.replace(

                `vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`,

                `                    
                      vec3 waves_color = vec3(getWaves(vUv)) * vec3(0.8, 0.8, 1.0);
                      
                      //vec3 outgoingLight = mix(diffuseColor.rgb * matcapColor.rgb, vec3(c), 0.5);
                      vec3 outgoingLight = matcapColor.rgb ;
                      `

            );


            game.shroomPsyMaterial4.userData.shader = shader;

        };

        this.shroomPsyMaterial5 = new THREE.MeshMatcapMaterial({ color: 0xffffff, matcap: this.chromeTexture2, skinning: true });

        this.shroomPsyMaterial5.onBeforeCompile = function (shader) {

            shader.uniforms.time = { value: 0 };

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_pars_vertex>`,
                `#ifdef UVS_VERTEX_ONLY
                          vec2 vUv;
                      #else
                          varying vec2 vUv;
                      #endif
                      uniform mat3 uvTransform;`
            );

            shader.vertexShader = shader.vertexShader.replace(
                `#include <uv_vertex>`,
                `vUv = ( uvTransform * vec3( uv, 1 ) ).xy;`
            );

            shader.vertexShader = shader.vertexShader.replace(
                `#include <displacementmap_pars_vertex>`,
                `	// uniform sampler2D displacementMap;
                          uniform float displacementScale;
                          uniform float displacementBias;
                          uniform float time;
  
                          mat2 rotate(float a)
                          {
                              float c = cos(a);
                              float s = sin(a);
                              return mat2(c, s, -s, c);
                          }
                          
                          float getWaves( vec2 uv ) {
  
                              // original shader: https://glslsandbox.com/e#66691.0
                              float _time = time * 0.1;
                              vec2 p = uv * 10.0;
                              vec2 i = p;
                              float c = 0.0;
                              float inten = 0.18;
                              float r = length(p+vec2(sin(_time),sin(_time*0.433+2.))*3.);
                              float d = length(p);
                              
                              for (float n = 0.0; n < 2.0; n++) {
                                  p *= rotate(d+time+p.x*2.4)*-0.15;
                                  float t = r-_time * (1.0 - (1.9 / (n+1.)));
                                      t = r-_time/(n+0.6);
                                  i -= p + vec2(
                                      cos(t - i.x-r) + sin(t + i.y), 
                                      sin(t - i.y) + cos(t + i.x)+r
                                  );
                                  c += 1.0/length(vec2(
                                      (sin(i.x+t)/inten),
                                      (cos(i.y+t)/inten)
                                      )
                                  );
                              
                              }
                              // c /= float(2.0);
  
                              return c;
                          }
                          `
            );

            // // displace vertices with waves
            // shader.vertexShader = shader.vertexShader.replace(
            //     `#include <displacementmap_vertex>`,
            //     `transformed += normalize( objectNormal ) * ( getWaves(uv*0.1) * 0.2 + 0.0 );`
            // );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <uv_pars_fragment>`,
                `varying vec2 vUv;`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `uniform float opacity;`,
                `uniform float opacity;
                      uniform float time;
                      mat2 rotate(float a)
                      {
                          float c = cos(a);
                          float s = sin(a);
                          return mat2(c, s, -s, c);
                      }`
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <bumpmap_pars_fragment>`,

                `
                      float getWaves( vec2 uv ) {
  
                          // original shader: https://glslsandbox.com/e#66691.0
                          float _time = time * 0.1;
                          vec2 p = uv * 10.0;
                          vec2 i = p;
                          float c = 0.0;
                          float inten = 0.18;
                          float r = length(p+vec2(sin(_time),sin(_time*0.433+2.))*3.);
                          float d = length(p);
                          
                          for (float n = 0.0; n < 2.0; n++) {
                              p *= rotate(d+time+p.x*2.4)*-0.15;
                              float t = r-_time * (1.0 - (1.9 / (n+1.)));
                                  t = r-_time/(n+0.6);
                              i -= p + vec2(
                                  cos(t - i.x-r) + sin(t + i.y), 
                                  sin(t - i.y) + cos(t + i.x)+r
                              );
                              c += 1.0/length(vec2(
                                  (sin(i.x+t)/inten),
                                  (cos(i.y+t)/inten)
                                  )
                              );
                          
                          }
                          // c /= float(2.0);
  
                          return c;
                      }
  
  
                      // uniform sampler2D bumpMap;
                      uniform float bumpScale;
  
                      // Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
                      // http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf
  
                      // Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)
  
                      vec2 dHdxy_fwd() {
  
                          vec2 dSTdx = dFdx( vUv );
                          vec2 dSTdy = dFdy( vUv );
  
                          // float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
                          // float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
                          // float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
  
                          float Hll = bumpScale * getWaves( vUv );
                          float dBx = bumpScale * getWaves( vUv + dSTdx ) - Hll;
                          float dBy = bumpScale * getWaves( vUv + dSTdy ) - Hll;
  
                          return vec2( dBx, dBy );
  
                      }
  
                      vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {
  
                          // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988
  
                          vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
                          vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
                          vec3 vN = surf_norm;		// normalized
  
                          vec3 R1 = cross( vSigmaY, vN );
                          vec3 R2 = cross( vN, vSigmaX );
  
                          float fDet = dot( vSigmaX, R1 );
  
                          fDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );
  
                          vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
                          return normalize( abs( fDet ) * surf_norm - vGrad );
  
                      }`
            );


            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <normal_fragment_maps>`,

                `
                      #ifdef OBJECTSPACE_NORMALMAP
                          normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals
                          #ifdef FLIP_SIDED
                              normal = - normal;
                          #endif
                          #ifdef DOUBLE_SIDED
                              normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
                          #endif
                          normal = normalize( normalMatrix * normal );
                      #elif defined( TANGENTSPACE_NORMALMAP )
                          vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
                          mapN.xy *= normalScale;
                          #ifdef USE_TANGENT
                              normal = normalize( vTBN * mapN );
                          #else
                              normal = perturbNormal2Arb( -vViewPosition, normal, mapN );
                          #endif
                      #elif defined( USE_BUMPMAP )
  
                          // normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );
  
                      #endif
  
                      normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );
  
                      `
            );

            shader.fragmentShader = shader.fragmentShader.replace(

                `vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`,

                `                    
                      vec3 waves_color = vec3(getWaves(vUv)) * vec3(0.8, 0.8, 1.0);
                      
                      //vec3 outgoingLight = mix(diffuseColor.rgb * matcapColor.rgb, vec3(c), 0.5);
                      vec3 outgoingLight = matcapColor.rgb ;
                      `

            );


            game.shroomPsyMaterial5.userData.shader = shader;

        };


        // game.shroomPsyMaterial2b = game.shroomPsyMaterial2.clone();

        this.materials = [

            game.blackMaterial, //0 <3 desaturate
            // game.chromeMaterial, //1 <3
            game.chromeMaterial2, //2 <3
            game.chromeMaterial3, //3 x
            game.chromeMaterial4, //4 <3
            game.chromeMaterial5, //5 <3
            // game.chromeMaterial6, //6 <3
            game.chromeMaterial7, //7 x
            game.chromeMaterial8, //8 <3 repat????
            // game.chromeMaterial9, //9 <3
            game.chromeMaterial10, //10 x
            // game.chromeMaterial11, //11 x
            game.greenMaterial, //12 duncan

        ];
        this.fflogoTexture.wrapS = THREE.RepeatWrapping;
        this.fflogoTexture.repeat.x = -1;
        this.cdjMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.FrontSide,
            map: new THREE.TextureLoader().load('assets/images/cdjsmall.jpg')

        });
        this.cdjMaterial2 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.FrontSide,
            map: new THREE.TextureLoader().load('assets/images/cdjsmall2.jpg')

        });
        this.djmMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.FrontSide,
            map: new THREE.TextureLoader().load('assets/images/djm-small.jpg')
        });
        this.downloadMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load('assets/images/cd.jpg')

        });

        this.fullTexture = new THREE.TextureLoader().load('assets/images/volume-button.jpg');
        this.muteTexture = new THREE.TextureLoader().load('assets/images/volume-button-empty.jpg');
        // this.whiteMaterial.color = "#00ff00";
        this.volumeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.FrontSide,
            map: this.fullTexture

        });






        let self = this;
        // var colours = [ "grey", "black","rgb(73, 73, 73)","black",];
        var colours = ["white", "blue", "red", "black",];
        var i = 0;

        function changeColor() {
            self.scene.background = new THREE.Color(colours[i]);
            self.whiteMaterial.color = new THREE.Color(colours[i]);
            self.shroomMaterial.color = new THREE.Color(colours[i]);
            // self.shroomPsyMaterial4.color = new THREE.Color(colours[i]);  // make shroom waves+bump blink
            // console.log(i);
            i += 1;
            if (i > 3) { i = 0 };
        }

        setInterval(changeColor, 30);

        loader.load(`${this.assetsPath}fbx/environment18.glb`, function (object) {

            object.scene.receiveShadow = false;
            object.scene.scale.multiplyScalar(100);
            // object.scene.position.y -= 0;
            object.scene.name = "Environment";

            game.environment = object.scene;
            game.colliders = [];
            game.playerColliders = [];
            game.scene.add(object.scene);
            object.scene.traverse(function (child) {
                if (child.isMesh) {
                    //if (child.name.startsWith("proxy")){
                    if (child.name.includes("proxy")) {
                        game.colliders.push(child);


                        child.castShadow = false;


                        child.material = game.debugMaterial2;
                        child.material.visible = false;

                    } else if (child.name.includes("boothcollider")) {

                        game.boothCollider = child;
                        game.colliders.push(game.boothCollider);
                        // child.material.visible = true;
                        // console.log('yo');
                        // const debugMaterial = new THREE.MeshBasicMaterial({
                        // 	color: 0xff0000,
                        // 	side: THREE.BackSide,
                        // })
                        // child.material = debugMaterial;
                        // child.castShadow = false;
                        game.boothCollider.material = game.debugMaterial2;
                        game.boothCollider.material.visible = false;

                        // game.screen = child;
                        //child.material = debugMaterial;


                        // }else if (child.name.includes("stageDance")) {

                        // 	game.stage = child;

                        // game.stage.material.visible = false;

                    } else if (child.name.includes("booth")) {

                        game.booth = child;

                        // const debugMaterial = new THREE.MeshBasicMaterial({
                        // 	color: 0xff0000,
                        // 	side: THREE.BackSide,
                        // })
                        // game.booth.material = debugMaterial;

                        // game.colliders.push(game.booth);
                        game.booth.material.visible = true;
                        // console.log('yo');
                        // const debugMaterial = new THREE.MeshBasicMaterial({
                        // 	color: 0xff0000,
                        // 	side: THREE.BackSide,
                        // })
                        // child.material = debugMaterial;
                        // child.castShadow = false;
                        // game.boothCollider.material = game.debugMaterial2;
                        // game.boothCollider.material.visible = false;

                        // game.screen = child;
                        //child.material = debugMaterial;


                    } else if (child.name.includes("screen")) {

                        child.material.visible = true;

                        // const debugMaterial2 = new THREE.MeshBasicMaterial({
                        // 	color: 0xff0000,
                        // 	side: THREE.BackSide,
                        // })
                        child.material = game.screenMaterial;

                        game.screen = child;
                        //child.material = debugMaterial;


                    } else if (child.name.includes("tubes")) {

                        const debugMaterial = new THREE.MeshPhongMaterial({
                            color: 0xffffff,
                            side: THREE.FrontSide,
                        })
                        child.material = debugMaterial;
                        // console.log(child.material);
                        child.castShadow = false;
                        child.receiveShadow = false;
                        child.material.side = THREE.FrontSide;
                        child.material.transparent = true;
                        child.material.opacity = 0.5;
                        child.material.shininess = 200;
                        child.material.dithering = true;
                        game.tubes = child;
                    } else if (child.name.includes("floor")) {

                        const debugMaterial = new THREE.MeshPhongMaterial({
                            color: 0xffffff,
                            side: THREE.FrontSide,
                        })

                        var floorSpecular = new THREE.TextureLoader().load('assets/images/normal3.jpg');
                        // var floorTexture = new THREE.TextureLoader().load('assets/images/normal3bw.jpg');
                        // floorTexture.wrapS = THREE.RepeatWrapping;
                        // floorTexture.wrapT = THREE.RepeatWrapping;
                        // floorTexture.repeat.x = 3;
                        // floorTexture.repeat.y = 3;

                        child.material.transparent = false;
                        child.material.color = new THREE.Color(0x555555);
                        child.material.shininess = 20;
                        child.material.dithering = true;
                        child.material = debugMaterial;

                        child.receiveShadow = false;

                        ////Bump Map
                        // child.material.bumpMap =floorTexture,

                        ////Normal Map
                        // child.material.normalMap = floorTexture;
                        // child.material.normal = 0.001;
                        // Map
                        // child.material.map = floorTexture;
                        child.material.specularMap = floorSpecular;

                        child.material.dithering = true;
                        game.floor = child;



                        // child.material.specularMap= floorTexture;
                        // child.material.shininess = 100;
                        // child.material.roughness = 0;

                        // child.material.map = floorTexture;

                        // child.material.needsUpdate = true;
                        // game.floors = child;
                        // console.log(child.material);
                    } else if (child.name.includes("CDJ1")) {


                        child.material = game.cdjMaterial;
                        child.material.map.flipY = false;
                        child.name = 'CDJ1';
                        game.cdj1 = child;

                        game.djEquipment.push(child);


                    } else if (child.name.includes("CDJ2")) {

                        game.cdj2 = child;

                        child.material = game.cdjMaterial2;
                        child.material.map.flipY = false;
                        child.name = 'CDJ2';

                        game.djEquipment.push(child);


                    } else if (child.name.includes("volume")) {


                        child.material = game.volumeMaterial;
                        child.material.map.flipY = false;
                        child.name = 'volume';
                        game.volume = child;
                        game.djEquipment.push(child);


                    } else if (child.name.includes("download")) {
                        child.material = game.downloadMaterial;
                        child.material.map.flipY = false;
                        child.name = 'download';
                        game.download = child;
                        game.djEquipment.push(child);

                    } else if (child.name.includes("DJM")) {

                        game.djm = child;
                        child.material = game.djmMaterial;
                        child.material.map.flipY = false;
                        child.name = 'DJM';
                        game.djEquipment.push(child);

                    } else {

                        child.renderOrder = 0;
                        child.castShadow = false;
                        child.receiveShadow = false;
                        child.dithering = true;
                        child.material.side = THREE.FrontSide,
                            child.material.dithering = true;
                        child.material.shininess = 100;
                        // child.material.colorWrite = false;

                    }
                }
            });



            game.loadNextAnim(loader);
        })

    }

    loadNextAnim(loader) {
        let anim = this.anims.pop();
        const game = this;
        // console.log(animsLookup);
        loaderGLTF.load(`${this.assetsPath}fbx/anims/${anim}.glb`, function (object) {
            game.player.animations[anim] = object.animations[0];
            if (game.anims.length > 0) {
                game.loadNextAnim(loader);
            } else {
                delete game.anims;
                animsLoaded = true;
                // game.player.action = animsLookup[0];
                game.mode = game.modes.ACTIVE;
                game.animate();
            }
        });
    }


    playerControl(forward, turn) {
        //  console.log({forward, turn});

        // if (turn >1)turn = 1;
        // if (turn < -1)turn = -1;

        // if (turn>1 | turn < -1)turn = 0;

        turn = -turn;



        // console.log(this.player.action);
        if (this.player.isJumping) {

            this.player.action = animsLookup[3]; //Running Forward Flip
            actionIndex = 3;

        } else {
            //if (this.player.action != animsLookup[3]){ //Running Forward Flip
            // this.player.object.children[0].position.y =0;
            if (forward > 0.15) {
                if (this.player.action != animsLookup[1]) this.player.action = animsLookup[1]; //Running
                actionIndex = 1;
                //	if (this.player.action!='Walking' && this.player.action!=animsLookup[1]) this.player.action = 'Walking';
            } else if (forward < -0.15) {
                if (this.player.action != animsLookup[2]) this.player.action = animsLookup[2]; // Walking Backwards
                actionIndex = 2;
            } else {
                // console.log("not fwd",turn, forward);
                forward = 0;


                if (Math.abs(turn) > 0.15) {
                    if (this.player.action != animsLookup[4]) this.player.action = animsLookup[4]; //Left Turn
                    actionIndex = 4;

                    // console.log("turn",forward, turn);
                    // console.log("turn : ",turn, " " , forward);
                } else if (mousedown && !this.player.jump) {
                    //this.player.action!=animsLookup[0] &&
                    this.player.action = animsLookup[5]; //Dancing Twerk
                    actionIndex = 5;

                    // console.log("dance");
                    // console.log("dance : ",turn, " " , forward);
                } else {
                    // if (this.player.action!=animsLookup[3]){ //Running Forward Flip
                    // if 
                    this.player.action = animsLookup[0]; //Idle
                    actionIndex = 0;
                    // console.log("idle");
                    // console.log("idle : ",turn, " " , forward);
                    // }
                }
            }
            //}

        }

        if (forward == 0 && turn == 0 && this.player.isJumping === false) {
            delete this.player.motion;
            // console.log("delete");
            //this.player.updateSocket();

            moving = false;
            this.player.updateSocket();
        } else {
            this.player.motion = { forward, turn };
            //this.player.updateSocket();
            moving = true;

        }


    }
    superShroom(thisPlayer) {
        superShroom = true;
        thisPlayer.shroomActivated = true;

        // if (game.sound.isPlaying) {
        //     console.log('sound restart');
        //     game.sound.source.stop();
        //     game.sound.isPlaying = false;
        // }
        // game.sound.setVolume(1.4);
        // game.sound.play();






        //invisible shroom

        playa = thisPlayer;
        console.log(playa.shaderIndex);

        //console.log(this.player.object);
        game.shroom.scene.position.set(positionShroom[shroomIndex].x, 160, positionShroom[shroomIndex].z);
        //		game.shroom.scene.visible = false;

        if (shroomIndex >= 6) {
            shroomIndex = 0;
        }


        if (youtubeMode && playa !== game.player) {
            console.log('not playing powerup', game.sound.volume);
        } else {
            console.log(' playing powerup', game.sound.volume);
            if (!twitchLoaded) {
                game.soundPowerup = game.sound.play('powerup');
            }
        };



        playa.shroomActivated = true;
        // playa.object.scale.multiplyScalar(1.5); 
        //playa.object.scale.set(1.4, 1.4, 1.4);
        playa.object.scale.set(1.6, 1.6, 1.6);

        //playa.socket.emit('chat message', {name, id:game.chatSocketId,  message:$('#messageInput').val() });
        // this.player.object.material.opacity = 0.2;
        playa.object.traverse(function (child) {

            if (child.isSkinnedMesh) {

                //child.material.color = red;


                // child.material = game.shroomPsyMaterial2;
                child.material = game.whiteMaterial;

                // // waves + bump test
                // child.material = game.shroomPsyMaterial4;

                //child.material.skinning = true;
                // // child.material.opacity = 0.7;
                // child.material.transparent = false;
                //child.material.shinning = true;
                //console.log(child);

            }

        });
        // setTimeout(function(){
        // 	audioPowerup.muted=false; 
        // }, 10);
        shroomDone = function () {
            //console.log('over');
            // game.player.object.scale.multiplyScalar(0.65); w
            //console.log(playa);

            //shroomDone = function(){ 
            playa.object.scale.set(1, 1, 1);
            playa.object.traverse(function (child) {

                if (child.isSkinnedMesh) {

                    // child.material = game.blackMaterial;
                    if (game.materials[playa.shaderIndex] !== undefined) {
                        console.log(playa.shaderIndex);
                        child.material = game.materials[playa.shaderIndex];

                        // game.shroomPsyMaterial3.userData.shader = null;
                    }
                }
                // game.shroom.scene.visible = true;
                game.shroom.scene.position.set(positionShroom[shroomIndex].x, positionShroom[shroomIndex].y, positionShroom[shroomIndex].z);
                //ffplayer.song.setVolume(0.5);
            });

            playa.shroomActivated = false;
            //};

        }
        setTimeout(function () {
            shroomDone();
            superShroom = false;
        }, 10000);


    }

    acid(thisPlayer) {
        acidTrip = true;
        thisPlayer.acid = true;

        // if (game.sound.isPlaying) {
        //     console.log('sound restart');
        //     game.sound.source.stop();
        //     game.sound.isPlaying = false;
        // }
        // game.sound.setVolume(1.4);
        // game.sound.play();







        //invisible shroom

        playa = thisPlayer;
        console.log(playa.shaderIndex);


        game.acidMesh.position.set(0, 160, 0);

        // if (shroomIndex >= 6) {
        //     shroomIndex = 0;
        // }

        playa.acid = true;
        playa.object.scale.set(1.6, 1.6, 1.6);

        if (youtubeMode && playa !== game.player) {
            console.log('not playing acid');
        } else {
            console.log(' playing acid');
            if (!twitchLoaded) {
                game.soundPowerup = game.sound.play('acid');
            }
        };


        //playa.socket.emit('chat message', {name, id:game.chatSocketId,  message:$('#messageInput').val() });
        // this.player.object.material.opacity = 0.2;
        playa.object.traverse(function (child) {

            if (child.isSkinnedMesh) {

                //child.material.color = red;

                // game.acidMesh.material = game.shroomPsyMaterial2;
                // child.material = game.shroomPsyMaterial2;

                child.material = game.shroomPsyMaterial2;

                // child.material = game.whiteMaterial;

                //child.material.skinning = true;
                // // child.material.opacity = 0.7;
                // child.material.transparent = false;
                //child.material.shinning = true;
                //console.log(child);

            }

        });
        // setTimeout(function(){
        // 	audioPowerup.muted=false; 
        // }, 10);
        acidDone = function () {
            //console.log('over');
            // game.player.object.scale.multiplyScalar(0.65); w
            //console.log(playa);

            //shroomDone = function(){ 
            playa.object.scale.set(1, 1, 1);
            playa.object.traverse(function (child) {

                if (child.isSkinnedMesh) {

                    // child.material = game.blackMaterial;
                    if (game.materials[playa.shaderIndex] !== undefined) {
                        console.log(playa.shaderIndex);
                        child.material = game.materials[playa.shaderIndex];

                        // game.shroomPsyMaterial3.userData.shader = null;
                    }
                }
                // game.shroom.scene.visible = true;
                game.shroom.scene.position.set(positionShroom[shroomIndex].x, positionShroom[shroomIndex].y, positionShroom[shroomIndex].z);
                //ffplayer.song.setVolume(0.5);
            });

            playa.acid = false;
            //};

        }
        setTimeout(function () {
            game.acidMesh.position.set(-200, 40, 90);
            game.camera.fov = 45;
            game.camera.updateProjectionMatrix();
            acidDone();
            acidTrip = false;
        }, 12000);


    }

    createCameras() {

        const back = new THREE.Object3D();
        back.position.set(0, 30, -50);
        back.parent = this.player.object;
        this.cameras = { back };
        this.activeCamera = this.cameras.back;
    }

    showMessage(msg, fontSize = 20, onOK = null) {
        const txt = document.getElementById('message_text');
        txt.innerHTML = msg;
        txt.style.fontSize = fontSize + 'px';
        const btn = document.getElementById('message_ok');
        const panel = document.getElementById('message');
        const game = this;
        if (onOK != null) {
            btn.onclick = function () {
                panel.style.display = 'none';
                onOK.call(game);
            }
        } else {
            btn.onclick = function () {
                panel.style.display = 'none';
            }
        }
        panel.style.display = 'flex';
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.cssrenderer.setSize(window.innerWidth, window.innerHeight); //BOOM

        //we do this because of weird safari orientation bug, so nice you gotta do it twice (a bit later)
        var self = this;
        setTimeout(function () {

            // console.log('resize',window.innerWidth, window.innerHeight );
            self.camera.aspect = window.innerWidth / window.innerHeight;
            self.camera.updateProjectionMatrix();
            self.renderer.setSize(window.innerWidth, window.innerHeight);
            self.cssrenderer.setSize(window.innerWidth, window.innerHeight); //BOOM

        }, 500);

    }

    onOrientationChange() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.cssrenderer.setSize(window.innerWidth, window.innerHeight); //BOOM

        //we do this because of weird safari orientation bug, so nice you gotta do it twice (a bit later)
        var self = this;
        setTimeout(function () {

            console.log('orientationchange', window.innerWidth, window.innerHeight);
            self.camera.aspect = window.innerWidth / window.innerHeight;
            self.camera.updateProjectionMatrix();
            self.renderer.setSize(window.innerWidth, window.innerHeight);
            self.cssrenderer.setSize(window.innerWidth, window.innerHeight); //BOOM

        }, 500);
    };

    onDocumentMouseMove(event) {



        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

        // console.log(this.mouse.y);

    }





    // onKeyPress(event) {

    // 	  var key = event.keyCode;
    // 	//   console.log("keypress",key);
    // 	//   console.log("is.selected",selected);
    // 	if (!selected){



    // 		// if (key===119 || key===38 ){
    // 		// 	fwd = 1; 
    // 		// }
    // 		// if (key===97){
    // 		// 	turn = -1; 
    // 		// }
    // 		// if (key===115){
    // 		// 	fwd = -1; 
    // 		// }

    // 		// if (key===100){
    // 		// 	turn = 1; 
    // 		// }
    // 		// if (key===32){
    // 		// 	this.player.jump = true;
    // 		// 	jump = 1;
    // 		// 	// console.log(this.player.action);

    // 		// }

    // 		// this.playerControl(fwd,turn,jump);






    // 	}

    // };


    //Upload test	

    onKeyDown(event) {
        keydown = true;
        var key = event.keyCode;

        // console.log(key);
        var key = event.keyCode;
        if (!enginesStarted) {
            startEngines();
            enginesStarted = true;
        }
        // if(!playInitialized && !youtubeMode && ffplayerLoaded){

        // 	if (kicked) return;
        // 	//console.log('playing on key down');

        // 	if( !game.sound.isPlaying && !game.sound2.isPlaying) {
        // 		game.sound.play();
        // 		game.sound.muted = true;
        // 		game.sound2.play();
        // 		game.sound2.muted = true;
        // 	}
        // 	setTimeout(function(){ 
        // 		game.sound.stop()
        // 	}, 1000);

        // 	ffplayer.playSong(songIndex);
        // 	ffplayer.song.setVolume(0.8);

        // 	playInitialized = true;
        // }
        // //
        // if(!youtubeIsPlaying  && youtubeApiLoaded && youtubeMode){
        // 	// if (!youtubeApiLoaded) return
        // 	if (kicked) return;

        // 	//youtubeInitialized = true;
        // 	if( !game.sound.isPlaying && !game.sound2.isPlaying) {
        // 		game.sound.play();
        // 		game.sound.muted = true;
        // 		game.sound2.play();
        // 		game.sound2.muted = true;
        // 	}

        // 	setTimeout(function(){ 
        // 		game.sound.stop()
        // 	}, 1000);

        // 	if (youtubePlayer === undefined) return;

        // 	playYoutube();
        // 	playInitialized = true;
        // }

        if (!selected) {
            if (key === 220) { //slash

                // document.getElementById("ffplayer").style.display = "block"
                if (showplayer == true) {
                    document.getElementById("ffplayer").style.display = "none";
                    showplayer = false;
                } else {
                    document.getElementById("ffplayer").style.display = "block";
                    showplayer = true;
                }
            }
            // if (key === 48) { //0
            //     walkInCircle = true;
            //     this.playerControl(fwd, turn);
            // }
            if (key === 38 || key === 87) { //up
                fwd = 1;
            }
            if (key === 37 || key === 65) { //left
                turn = -1;
            }
            if (key === 40 || key === 83) { //dwn
                fwd = -1;
            }

            if (key === 39 || key === 68) { //right
                turn = 1;
            }
            if (key === 13) { //enter
                turn = 0;
                fwd = 0;
                this.playerControl(fwd, turn);
            }
            if (key === 32) { //spacebar


                jumpUp();



            }
            // console.log("keyboard",turn);
            this.playerControl(fwd, turn);

            if (key === 221) { //bracket-right
                if (!youtubeMode) {
                    ffplayer.nextSong();
                }
            }
            if (key === 219) { //bracket-left
                if (!youtubeMode) {
                    ffplayer.previousSong();
                }
            }
            // if (key===219){ //bracket-left
            // 	ffplayer.nextSong(10);
            // 	//console.log(ffplayer);

            // }

            //	this.playerControl(fwd,turn);

            if (key === 192) { //tilda


                //PLAYER POPOUT
                if (!playerPopout) {
                    // $("#css").css("positon", "absolute");
                    $("#css").css("z-index", "1");
                    playerPopout = true;
                } else {
                    // $("#css").css("positon", "absolute");
                    $("#css").css("z-index", "0");
                    playerPopout = false;
                }

                console.log("Scene polycount:", this.renderer.info.render.triangles);
                console.log("Active Drawcalls:", this.renderer.info.render.calls);
                console.log("Textures in Memory", this.renderer.info.memory.textures);
                console.log("Geometries in Memory", this.renderer.info.memory.geometries);
            }
        }
        if (key === 9) { //tab
            event.preventDefault();

            if ($("#nameInput").is(":visible")) {
                $("#nameInput").click().focus();
                $("#nameInput").select();
            } else {
                $("#messageInput").click().focus();
                $("#messageInput").select();
            }
            selected = true;
        }


        // if (key===192){ //tilda
        // 	event.preventDefault();
        // 	$("#messageInput").click().focus();
        // 	$("#messageInput").select();
        // 	selected = true;
        // }
        if (key === 187) { //9
            if (game.renderer.antialias) {
                game.renderer.antialias = false;
            } else {
                game.renderer.antialias = true;
            }

            console.log(game.renderer);
            // this.player.action = 'Twerk';
        }





    };

    onKeyUp(event) {
        keydown = false;
        var key = event.keyCode;
        //   console.log("keyup",key);
        // console.log(key);

        var key = event.keyCode;


        if (key === 87) { //w
            fwd = 0;
        }
        if (key === 65) { //a
            turn = 0;
        }
        if (key === 83) { //s
            fwd = 0;
        }

        if (key === 68) { //d
            turn = 0;
        }



        if (key === 38) { //up
            fwd = 0;
        }
        if (key === 37) { //left
            turn = 0;
        }
        if (key === 40) { //dwn
            fwd = 0;
        }

        if (key === 39) { //right
            turn = 0;
        }

        if (key === 32) { //spacebar
            canJump = true;
        }
        if (key === 13) { //enter
            turn = 0;
            fwd = 0;
            this.playerControl(fwd, turn);
        }
        // if (key===32){ //right
        // 	jump = 0;
        // 	// this.player.jump = false;
        // }

        // switch (key) {
        // 		case 96:
        // 			console.log('dance.');
        // 			this.player.action = 'Twerk';
        // 		break;
        // 	}
        // if (this.playerControl !=undefined) return;

        if (selected) return;
        this.playerControl(fwd, turn);
        //game.player.updateSocket(); 


    };


    updateRemotePlayers() {
        if (this.remoteData === undefined || this.remoteData.length == 0 || this.player === undefined || this.player.id === undefined) return;
        // console.log(this.remoteData);
        // if (game.player.id === data.id) return;
        const newPlayers = [];
        const game = this;
        //Get all remotePlayers from remoteData array
        const remotePlayers = [];
        const remoteColliders = [];

        this.remoteData.forEach(function (data) {

            //UPDATE REMOTE PLAYER POS
            game.remotePlayers.forEach(function (player) {

                // console.log(data);
                if (player.id == data.id) {
                    const euler = new THREE.Euler(data.pb, data.h, data.pb);
                    let lerpedPos = new THREE.Vector3();
                    lerpedPos.x = THREE.Math.lerp(player.object.position.x, data.x, 0.3);
                    lerpedPos.y = THREE.Math.lerp(player.object.position.y, data.y, 0.3);
                    lerpedPos.z = THREE.Math.lerp(player.object.position.z, data.z, 0.3);
                    player.nextposition = lerpedPos;
                    player.nextrotation = euler;
                    player.nextaction = data.a;
                }


            });

            if (game.player.id != data.id) {

                let iplayer;
                game.initialisingPlayers.forEach(function (player) {
                    if (player.id == data.id) iplayer = player;
                });

                //If not being initialised check the remotePlayers array
                if (iplayer === undefined) {
                    let rplayer;
                    game.remotePlayers.forEach(function (player) {
                        if (player.id == data.id) rplayer = player;
                    });

                    if (rplayer === undefined) {
                        //Initialise player
                        game.initialisingPlayers.push(new Player(game, data));
                        // console.log(data);
                    } else {

                        if (data.points != undefined) {
                            rplayer.speechBubble.updatePoints(data.points);
                        }

                        if (data.name != undefined && !rplayer.speechBubble.nameUpdated) {
                            rplayer.speechBubble.updateName(data.name);
                            // rplayer.speechBubble.updateName(data.name);
                        }

                        remotePlayers.push(rplayer);
                        remoteColliders.push(rplayer.collider);

                    }
                }
            }
        });

        this.scene.children.forEach(function (object) {
            if (object.userData.remotePlayer && game.getRemotePlayerById(object.userData.id) == undefined) {
                game.scene.remove(object);
            }
        });

        //console.log(remotePlayers);
        this.remotePlayers = remotePlayers;
        this.remoteColliders = remoteColliders;
    }

    detectCollisionCubes(object1, object2) {

        // console.log("detectCollisionCubes");
        // console.log("detecting collisions");
        // object1.geometry.computeBoundingBox(); //not needed if its already calculated
        // object2.geometry.computeBoundingBox();


        // object1.updateMatrixWorld();
        // object2.updateMatrixWorld();

        // var box1 = object1.geometry.boundingBox.clone();
        // box1.applyMatrix4(object1.matrixWorld)

        // var box2 = object2.geometry.boundingBox.clone();
        // box2.applyMatrix4(object2.matrixWorld);


        let box1 = object1.geometry.boundingBox.clone();
        box1.applyMatrix4(object1.matrixWorld);

        if (object2.geometry === null) return;
        let box2 = object2.geometry.boundingBox.clone();
        box2.applyMatrix4(object2.matrixWorld);

        // var box1;
        // var box2;
        // let box1 = object1.geometry.boundingBox;
        // box1.applyMatrix4(object1.matrixWorld);

        // let box2 = object2.geometry.boundingBox;
        // box2.applyMatrix4(object2.matrixWorld);

        // box1.copy( object1.geometry.boundingBox ).applyMatrix4( object1.matrixWorld );

        // box2.copy( object1.geometry.boundingBox ).applyMatrix4( object1.matrixWorld );


        // var box1 = object1.geometry.boundingBox;

        // var box2 = object2.geometry.boundingBox;
        // console.log(box1,box2);
        // object1.geometry.boundingBox.applyMatrix4(object2.matrixWorld);
        // object2.geometry.boundingBox.applyMatrix4(object2.matrixWorld);

        // var box1 = object1.geometry.boundingBox;
        // var box2 = object2.geometry.boundingBox;
        // console.log(box1,box2);

        //if intesecting remote player, get their id
        if (box1.intersectsBox(box2)) {

            // if local player intersect shroom, activate shroom, send 100 points, set shroom index
            if (object2.name == "shroom" && this.player.shroomActivated != true) {
                // showWinner(winner); 
                // this.player; 
                this.player.points += 100;
                // this.player.points += 950;
                this.player.speechBubble.updatePoints(this.player.points);
                this.player.socket.emit('set points', this.player.points);
                this.player.socket.emit('set shroom', this.player.shroomActivated);

                if (!superShroom) {
                    game.superShroom(this.player);
                }


                shroomIndex = Math.floor(Math.random() * 6);
                game.player.socket.emit("shroomIndex", shroomIndex);

            } else if (object2.name == "acidMesh" && this.player.shroomActivated != true && this.player.acid != true) {
                this.player.points += 100;
                this.player.speechBubble.updatePoints(this.player.points);
                this.player.socket.emit('set points', this.player.points);
                this.player.socket.emit('set acid', this.player.acid);
                game.acid(this.player);

            } else if (object2.name == "dubplateMesh" || object2.name == "dubplateMesh2" || object2.name == "dubplateMesh3") {
                // this.player.points += 200;

                // this.player.speechBubble.updatePoints(this.player.points);
                // this.player.socket.emit('set points', this.player.points);
                // this.player.socket.emit('set acid', this.player.acid);



                // game.acid(this.player);



                if (!downloadingDubplate) {
                    object2.material = game.shroomMaterial;
                    setTimeout(function () {
                        object2.material = game.downloadMaterial;
                        downloadingDubplate = false;
                    }, 1300);
                    const downloadFile = (url, filename) => {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = filename || 'download';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    };
                    if (object2.name == "dubplateMesh") {
                        downloadFile('https://cdn.fractalfantasy.net/FFClubEdits2021.zip', 'FFClubEdits2021.zip');
                    } else if (object2.name == "dubplateMesh2") {
                        downloadFile('https://cdn.fractalfantasy.net/FFClubEdits2.zip', 'FFClubEdits2.zip');
                    } else if (object2.name == "dubplateMesh3") {
                        downloadFile('https://cdn.fractalfantasy.net/FFClubEdits3.zip', 'FFClubEdits3.zip');
                    }
                    showTitle("DOWNLOADING DUBPLATE...");
                    game.sound.play('lickshots');
                    console.log("download dubplate");
                    downloadingDubplate = true;

                }

                // var dlButton = document.getElementById("download-button")
                // dlButton.click();
            } else {
                // if not shroom , and player has activated shroom, remote player hit, send 10
                if (this.player.shroomActivated) {
                    //REMOTE PLAYER HIT
                    this.player.points += 1;

                    if (this.player.points >= 1001) { //if points over 100 set points to 0;
                        this.player.points = 0;
                    };
                    this.player.speechBubble.updatePoints(this.player.points);
                    this.player.socket.emit('set points', this.player.points);
                    // console.log(object2.parent);

                    // console.log(object2.parent);
                    object2.parent.traverse(function (child) {
                        if (child.isSkinnedMesh) {
                            //child.material = Thre
                            child.material = game.debugMaterial;
                            // self = this;
                            // console.log(object2.parent);
                            setTimeout(function () {
                                // child.material = game.blackMaterial;
                                var previousMaterial = game.materials[object2.parent.shaderIndex];
                                if (previousMaterial != undefined) {
                                    child.material = previousMaterial;
                                }

                            }, 1000);

                        }
                    });

                    if (!hitsoundplaying) {
                        if (!twitchLoaded) {
                            game.soundHit = game.sound.play('hit');
                        }
                    }
                    hitsoundplaying = game.sound.playing(game.soundHit)
                    // console.log(hitsoundplaying);
                }
                // if not shroom , and remote player has activated shroom, local player hit, send -1
                if (object2.parent.shroomActivated) {
                    //LOCAL PLAYER HIT
                    this.player.points -= 1;
                    this.player.speechBubble.updatePoints(this.player.points);
                    this.player.socket.emit('set points', this.player.points);
                    this.player.object.traverse(function (child) {
                        // var self = this;	
                        if (child.isSkinnedMesh) {
                            //child.material = Thre
                            child.material = game.debugMaterial;
                            // console.log(self.player);
                            setTimeout(function () {
                                // child.material = game.blackMaterial;
                                child.material = game.materials[game.player.shaderIndex];
                            }, 1000);

                        }
                    });
                    if (!hitsoundplaying) {
                        if (!twitchLoaded) {
                            game.soundHit = game.sound.play('hit');
                        }
                    }
                    hitsoundplaying = game.sound.playing(game.soundHit)
                    // console.log(hitsoundplaying);

                }

                //IF OTHER PLAYER IS DANCING
                if (this.player.mixer.name == "Dancing Twerk" && object2.parent.children[0].mixer.name == "Dancing Twerk") {
                    this.player.points += 1;
                    if (this.player.points >= 1001) {
                        this.player.points = 0;
                    };
                    this.player.speechBubble.updatePoints(this.player.points);
                    this.player.socket.emit('set points', this.player.points);

                    //HOE

                    // if(!dancingShader){

                    // 	this.player.object.traverse(function(child) {
                    // 		if (child.isSkinnedMesh) {
                    // 			dancingShader = true;
                    // 			// child.material = game.greenMaterial;
                    // 			game.shroomPsyMaterial4.matcap = game.materials[game.player.shaderIndex].matcap;
                    // 			game.shroomPsyMaterial4.bumpScale = 0.0;

                    // 			child.material = game.shroomPsyMaterial4;

                    // 			console.log("psy shader on remote player");
                    // 			setTimeout(function() {
                    // 				console.log("psy shader off local player");
                    // 				//console.log(game.player.mixer.name);

                    // 						// if (game.player.mixer.name !== "Dancing Twerk" | object2.parent.children[0].mixer.name == "Dancing Twerk"){
                    // 							// console.log(game.player.mixer.name);
                    // 							var previousMaterial = game.materials[game.player.shaderIndex];
                    // 							child.material = previousMaterial;

                    // 						// }
                    // 				dancingShader = false;
                    // 			}, 2800);
                    // 		}
                    // 	});

                    // 	object2.parent.traverse(function(child) {
                    // 		if (child.isSkinnedMesh) {
                    // 			console.log("psy shader on remote player");
                    // 			game.shroomPsyMaterial5.bumpScale = 0.0;
                    // 			game.shroomPsyMaterial5.matcap = game.materials[object2.parent.shaderIndex].matcap;
                    // 			child.material = game.shroomPsyMaterial5;
                    // 			// child.material = game.greenMaterial;
                    // 			setTimeout(function() {
                    // 				console.log("psy shader off remote player");
                    // 				// if (game.player.mixer.name !== "Dancing Twerk"){
                    // 					var previousMaterial = game.materials[object2.parent.shaderIndex];
                    // 					if (previousMaterial != undefined) {
                    // 						child.material = previousMaterial;
                    // 					}
                    // 				// }

                    // 			}, 2800);
                    // 		}
                    // 	});


                    // }


                } else {

                    // if (dancingShader){
                    // 	this.player.object.traverse(function(child) {
                    // 		if (child.isSkinnedMesh) {
                    // 			setTimeout(function() {
                    // 				console.log(game.player.mixer.name);

                    // 						// if (game.player.mixer.name !== "Dancing Twerk"){
                    // 							// console.log(game.player.mixer.name);
                    // 							console.log("non dancing psy shader off local player");
                    // 							var previousMaterial = game.materials[game.player.shaderIndex];
                    // 							if (previousMaterial != undefined) {
                    // 								console.log("setting shader bk local player");
                    // 								child.material = previousMaterial;
                    // 							}


                    // 						// }
                    // 						dancingShader = false;
                    // 			}, 200);
                    // 		}
                    // 	});


                    // 	object2.parent.traverse(function(child) {
                    // 		if (child.isSkinnedMesh) {

                    // 			// child.material = game.shroomPsyMaterial4;
                    // 			setTimeout(function() {
                    // 				// if (game.player.mixer.name !== "Dancing Twerk"){
                    // 					console.log("non dancing psy shader off remote player");
                    // 					var previousMaterial = game.materials[object2.parent.shaderIndex];
                    // 					if (previousMaterial != undefined) {
                    // 						console.log("setting shader bk remote player");
                    // 						child.material = previousMaterial;
                    // 					}
                    // 				// }

                    // 			}, 200);
                    // 		}

                    // 	});

                    // }

                }


            }

            // console.log(box1.intersectsBox(box2), object2.parent.userData.id, object2.parent.children[0].mixer.name );

        }
        return box1.intersectsBox(box2);




    }



    // jump(){
    // 	console.log("doubleclick");
    // 	this.player.jump = true;
    // 		jump = 1;
    // 		this.playerControl(fwd,turn,jump);
    // }

    intersectThings(xDown, yDown) {

        const mouse = new THREE.Vector2();

        if (!isMobile) {

            mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        } else {
            mouse.x = (xDown / this.renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(yDown / this.renderer.domElement.clientHeight) * 2 + 1;


        }
        // console.log(mouse.x,mouse.y);
        // console.log(mouse.x,mouse.y);
        // const pos = this.player.object.position.clone();
        // pos.y += 20;
        // let dir = new THREE.Vector3();
        // this.player.collider.getWorldDirection(dir);
        // let dir2 = pos;
        // dir.y += 0.2;
        // let raycaster = new THREE.Raycaster(pos, dir);
        // this.scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 50, 0xff0000) );

        // const intersects = raycaster.intersectObjects( this.remoteColliders );




        // if (intersects.length>0){
        // 	const object = intersects[0].object;
        // 	const players = this.remotePlayers.filter( function(player){
        // 		if (player.collider!==undefined && player.collider==object){
        // 			return true;
        // 		}
        // 	});
        // 	if (players.length>0){
        // 		const player = players[0];
        // 		console.log(`onMouseDown: player ${player.id}`);

        // }else{

        // }

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        const intersects = raycaster.intersectObjects(this.djEquipment);
        // const chat = document.getElementById('chat');
        //	console.log(this.djEquipment);

        // console.log('yo');
        if (intersects.length > 0) {

            const object = intersects[0].object;
            //console.log("intersect",object.name);
            if (object.name === "CDJ1") {



                object.material = game.shroomMaterial;

                setTimeout(function () {
                    object.material = game.cdjMaterial;

                }, 1000);
                if (ffplayer == undefined) return;
                if (!youtubeMode && !twitchMode) {
                    ffplayer.previousSong();
                } else {
                    // $("#songlog").append("<h>" + "CONTROLS NOT AVAILABLE DURING PERFORMANCE"+ "</h><br>");
                    // $("#songlog").scrollTop($("#songlog")[0].scrollHeight);
                    // // $("#songlog").
                    //	$("#songlog").show("CONTROLS NOT AVAILABLE DURING PERFORMANCE");

                    showTitle("CONTROLS NOT AVAILABLE DURING PERFORMANCE");
                }
            } else if (object.name === "CDJ2") {
                object.material = game.shroomMaterial

                setTimeout(function () {
                    object.material = game.cdjMaterial2;

                }, 1000);
                //if (ffplayer == undefined) return;
                if (!youtubeMode && !twitchMode) {
                    ffplayer.nextSong();
                } else {
                    // $("#songlog").append("<h>" + "CONTROLS NOT AVAILABLE DURING PERFORMANCE"+ "</h><br>");
                    // $("#songlog").scrollTop($("#songlog")[0].scrollHeight);
                    // // $("#songlog").
                    // $("#songlog").show();
                    showTitle("CONTROLS NOT AVAILABLE DURING PERFORMANCE");
                }
            } else if (object.name === "DJM") {

                object.material = game.shroomMaterial;
                setTimeout(function () {
                    object.material = game.djmMaterial;

                }, 200);
                //if (ffplayer == undefined) return;
                if (!youtubeMode && !twitchMode) {
                    ffplayer.playButton.click();
                } else {
                    // $("#songlog").append("<h>" + "CONTROLS NOT AVAILABLE DURING PERFORMANCE"+ "</h><br>");
                    // $("#songlog").scrollTop($("#songlog")[0].scrollHeight);
                    // // $("#songlog").
                    // $("#songlog").show();
                    showTitle("CONTROLS NOT AVAILABLE DURING PERFORMANCE");
                }
            } else if (object.name === "volume") {
                object.material = game.shroomMaterial;
                setTimeout(function () {
                    object.material = game.volumeMaterial;

                }, 200);


                if (!muted) {
                    if (ffplayer !== undefined) {
                        ffplayer.song.setVolume(0.0);
                        showTitle("MUTED");
                    }
                    if (youtubePlayer !== undefined) {
                        youtubePlayer.setVolume(0);
                        showTitle("MUTED");
                    }
                    game.volumeMaterial.map = this.muteTexture;
                    muted = true;
                } else {
                    object.material = game.shroomMaterial;
                    setTimeout(function () {
                        object.material = game.volumeMaterial;

                    }, 200);
                    if (ffplayer != undefined) {
                        ffplayer.song.setVolume(0.8);
                        showTitle("UNMUTED");
                    }
                    if (youtubePlayer !== undefined) {
                        youtubePlayer.setVolume(100);
                        showTitle("UNMUTED");
                    }

                    game.volumeMaterial.map = this.fullTexture;
                    muted = false;
                }



            } else if (object.name === "download") {
                object.material = game.shroomMaterial;
                setTimeout(function () {
                    object.material = game.downloadMaterial;

                }, 600);

                showTitle("DOWNLOADING 'FF CLUB EDITS'...");
                var dlButton = document.getElementById("download-button")
                dlButton.click();

                // if (!youtubeMode){
                // 	switchAudioModes(true);
                // } else {
                // 	switchAudioModes(false);
                // }


            } // ffplayer.playButton.click();
        }

        if (event.button !== 0) { //rightclick player //KICK

            const intersects2 = raycaster.intersectObjects(this.remoteColliders);

            if (intersects2.length > 0) {

                const object = intersects2[0].object;
                console.log(object);

                const players = this.remotePlayers.filter(function (player) {
                    if (player.collider !== undefined && player.collider == object) {
                        return true;
                    }
                });

                if (players.length > 0) {
                    const player = players[0];
                    console.log(`("${player.id}");`);

                }
            };
        }

    };

    onMouseDown(event) {

        //showWinner("SINJIN COCK");
        // showScores();
        mousedown = true;
        // if (!twitchLoaded){
        // 	twitch();
        // 	twitchLoaded =true;
        // } 








        game.intersectThings(event);



        game.danceStart();

        if (!enginesStarted) {
            startEngines();
            enginesStarted = true;
        }

    }



    danceStart() {
        if (!game.player.isJumping && game.player.action === animsLookup[0]) { //Idle
            // console.log(this.player.action );
            danceIndex = getRandomDance();
            game.player.action = animsLookup[danceIndex]; //Dancing Twerk
            actionIndex = danceIndex;

            // game.player.action = animsLookup[6]; //Dancing Twerk
            //actionIndex = danceIndex;
            //console.log(danceIndex);
            moving = true;
            //this.player.updateSocket(); 
        }

        dancingcheck = true;

    }

    danceStop() {
        mousedown = false;
        if (!this.player.isJumping && this.player.action === animsLookup[danceIndex]) { //Dancing Twerk
            //if (!this.player.isJumping && this.player.action === animsLookup[6]) { //Dancing Twerk
            this.player.action = animsLookup[0]; //Idle
            actionIndex = 0;
            this.player.updateSocket();
            moving = false;
        }
        dancingcheck = false;
    }

    onMouseUp(event) {
        // console.log(animsLookup[5]);


        game.danceStop();
        // if (isMobile){
        // 	//document.getElementById("Thumb").style.opacity = 0.0;
        // }

    }
    // function uniKeyCode(event) {
    //   var key = event.keyCode;
    //   console.log(event.keyCode);
    // }
    getRemotePlayerById(id) {
        if (this.remotePlayers === undefined || this.remotePlayers.length == 0) return;

        const players = this.remotePlayers.filter(function (player) {
            if (player.id == id) return true;
        });

        if (players.length == 0) return;

        return players[0];


    }

    animate() {
        stats.begin();
        const game = this;
        const dt = this.clock.getDelta();
        var time = this.clock.elapsedTime;


        this.dubplateMesh.rotation.y += 2 * dt;
        this.dubplateMesh2.rotation.y += 2 * dt;
        this.dubplateMesh3.rotation.y += 2 * dt;
        //   cube.rotation.y += 0.01;

        // PSY SHADER UPDATE
        if (this.shroomPsyMaterial2b.userData.shader) {
            this.shroomPsyMaterial2b.userData.shader.uniforms.time.value = performance.now() / 150;

            //    console.log("shroomPsyMaterial2")
        }
        if (this.shroomPsyMaterial2.userData.shader && acidTrip) {
            this.shroomPsyMaterial2.userData.shader.uniforms.time.value = performance.now() / 150;

            if (game.player.acid) {
                game.camera.fov = Math.sin(time * 2.5) * 20;
                game.camera.updateProjectionMatrix();
            }
            //	console.log("acidTrip")
        }

        if (this.shroomPsyMaterial3.userData.shader && superShroom) {
            this.shroomPsyMaterial3.userData.shader.uniforms.time.value = performance.now() / 150;
            //  console.log("shroomPsyMaterial3")
        }

        if (this.shroomPsyMaterial4.userData.shader) {
            this.shroomPsyMaterial4.userData.shader.uniforms.time.value = performance.now() / 150;
            //  console.log("shroomPsyMaterial4")
        }
        if (this.shroomPsyMaterial5.userData.shader) {
            this.shroomPsyMaterial5.userData.shader.uniforms.time.value = performance.now() / 150;
            //  console.log("shroomPsyMaterial5")
        }

        // PLAYER POSITION
        for (let index = 0; index < this.remotePlayers.length; index++) {
            const player = this.remotePlayers[index];
            player.update(dt);
        }

        // AUDIO ANALYSIS
        if (useAudioAnalysis) {
            updateAudioAnalysis();
        }


        // SET STROBE 
        if (audioBeatsLoaded) {
            var song = audioBeats[currentSongIndex];
            var songTime = currentAudioElement ? currentAudioElement.currentTime : 0.0;
            var beats = song["beats"];
            var beatIndex = song["beatIndex"];
            currentBPM = song["bpm"];
            var elapsedTime = songTime;
            var wasBeat = false;
            if (elapsedTime >= beats[beatIndex]) {
                song["beatIndex"] += 1;
                moveBeat();
                //lights alternate
                if (!strobe) {
                    strobe = true;
                } else {
                    strobe = false;
                }
            }
            wasBeat = true;

        }

        // ANIMATE LOCAL PLAYER
        if (this.player.mixer != undefined && this.mode == this.modes.ACTIVE) this.player.mixer.update(dt);

        // MOVE LOCAL PLAYER
        if (this.player.motion !== undefined | this.player.isJumping) {
            this.player.move(dt);
        }

        // UPDATE CAMERA PLAYER
        if (this.cameras != undefined && this.cameras.active != undefined && this.player !== undefined && this.player.object !== undefined) {
            const pos = this.player.object.position.clone();
            //OG CAMERA
            if (isMobile) {
                pos.y += 25;
                // this.camera.position.z =-45;
                // this.camera.position.y =29;
                this.camera.position.z = -50;
                this.camera.position.y = 32;
                this.camPosition = this.cameras.active.getWorldPosition(this.camTarget);
                this.player.speechBubble.show(this.camPosition);
                this.camera.lookAt(pos);
            }
            if (!isMobile & loadingScreenFaded) {
                this.controls.minDistance = 40;
                this.controls.maxDistance = 40;
                this.controls.enableDamping = false;
                this.controls.dampingFactor = 0.27;
                // this.controls.rotateSpeed = 0.28;
                this.controls.rotateSpeed = 1.18;
                this.controls.screenSpacePanning = false;
                if (useMouseHeading) {
                    pos.y += 25;
                    this.controls.target = pos;
                    this.controls.update();

                } else {
                    this.controls.target = new THREE.Vector3(0, 22.0, 0)
                }

                this.camPosition = game.controls.object.getWorldPosition(this.camTarget);
                if (useMouseHeading) {
                    game.rotation = this.controls.getAzimuthalAngle();
                }
                this.player.speechBubble.show(this.camPosition);
            }
        }

        //MOVE LIGHTS
        if (this.colorLight !== undefined) {

            var time = this.clock.elapsedTime;
            var x = Math.sin(time * 0.5) * 10;
            var z = Math.cos(time * 0.5) * 10;
            var x2 = Math.sin(time * 1) * 100;
            var z2 = Math.cos(time * 1) * 100;

            this.sun2.position.x = x2;
            this.sun2.position.z = z2 - 60;
            if (!youtubeMode && useAudioAnalysis) { //audio and audio analysis
                audioSignal1 = levelsData[0];
            } else if (!youtubeMode && !useAudioAnalysis) { //audio and no audio analysis
                this.colorLight.intensity = light1Intensity;
            } else { //youtube mode
                strobe = true;
                this.sun2.intensity = light2Intensity;
                this.colorLight.intensity = light1Intensity;
            }

            this.sun2.position.y = 30;
            if (strobe) {
                this.sun2.intensity = light2Intensity;
            } else {
                if (youtubeMode) {
                    this.sun2.intensity = 1.1;
                } else {
                    this.sun2.intensity = 0.1;
                }
            }
        }


        this.renderer.render(this.scene, this.camera);


        //STRESS TEST
        // this.renderer.render(this.scene, this.camera);
        // this.renderer.render(this.scene, this.camera);
        // this.renderer.render(this.scene, this.camera);
        // this.renderer.render(this.scene, this.camera);
        // this.renderer.render(this.scene, this.camera);
        // this.renderer.render(this.scene, this.camera);


        //this.cssrenderer.render(this.cssscene, this.camera); //BOOM

        // if(twitchLoaded){
        // 	this.cssrenderer.render(this.cssscene, this.camera);
        // }
        // this.cssrenderer.render(this.cssscene, this.camera);

        if (youtubeMode) {
            if (!youtubeIsPlaying) { //if youtube isn't playing render css (we need this to get the player started)
                this.cssrenderer.render(this.cssscene, this.camera); //BOOM
            } else {
                //YOUTUBE BLACKOUT BUG FIX
                if (isChrome) { // the google blackout bug only appears on Google Chrome
                    //set frustum from camera
                    this.frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));

                    //if it contains the position of the scree put camera back
                    if (this.frustum.containsPoint(this.cssobject.position)) {
                        if (youtubeScreenMinimized) {
                            $("iframe").css("transform", "translate(-50%, -50%) matrix3d(0.00727819, 0, -0.349924, 0, 0, -0.35, 0, 0, 0.349924, 0, 0.00727819, 0, -255, 60, -72, 1)");
                            $("iframe").css("opacity", "1.0");
                            $("iframe").css("width", "480px");
                            $("iframe").css("height", "360px");
                            youtubeScreenMinimized = false;
                        }

                        this.cssrenderer.render(this.cssscene, this.camera);

                    } else {
                        //console.log('outside camera view',this.cssobject.position);
                        if (youtubeIsPlaying) {
                            $("iframe").parent().css("transform", "none");
                            $("iframe").css("transform", "none");
                            //$("iframe").css("opacity", "0.0");
                            $("iframe").css("width", "5px");
                            $("iframe").css("height", "5px");
                            youtubeScreenMinimized = true;
                        }
                    }
                } else {
                    //if not chrome just proced as normal (no bug fix needed)
                    this.cssrenderer.render(this.cssscene, this.camera); //BOOM
                }
            }


        }


        if (!isMobile && twitchLoaded && isChrome) {
            this.frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));

            //if it contains the position of the screen put camera back
            if (this.frustum.containsPoint(this.cssobject2.position)) {
                if (youtubeScreenMinimized) {
                    $("#twitchDiv").css("transform", "translate(-50%, -50%) matrix3d(0.00727819, 0, -0.349924, 0, 0, -0.35, 0, 0, 0.349924, 0, 0.00727819, 0, -255, 60, -72, 1)");
                    $("#twitchDiv").css("opacity", "1.0");
                    $("#twitchDiv").css("width", "480px");
                    $("#twitchDiv").css("height", "360px");
                    youtubeScreenMinimized = false;
                    // console.log("put screen back");
                }

                this.cssrenderer.render(this.cssscene, this.camera);
                // console.log("render")

            } else {

                // $("iframe").parent().css("transform", "none");
                $("#twitchDiv").css("transform", "none");
                $("#twitchDiv").css("width", "5px");
                $("#twitchDiv").css("height", "5px");
                youtubeScreenMinimized = true;



                // console.log("twitch minimized");

            }
        } else {
            //if not chrome just proced as normal (no bug fix needed)
            this.cssrenderer.render(this.cssscene, this.camera); //BOOM
            // console.log("twitch minimized");
        }


        // if (twitchLoaded) {
        // 	// this.cssrenderer.render(this.cssscene, this.camera); //BOOM

        // 	 //UNCOMMENT THESE LINES TO GET YOUTUBE TO POP OUT
        // 	 // if (isChrome && isIframe) {
        // 	 // 	if (!youtubeIsPlaying){

        // 			//  $("youtubeDiv").parent().css("transform", "none");
        // 			//  $("youtubeDiv").css("transform", "none");
        // 			 //$("#css").css("z-index", "0");
        // 	 // 	}

        // 	 // }
        //  }

        // if (youtubeMode) {
        //     this.cssrenderer.render(this.cssscene, this.camera); //BOOM

        // 	//UNCOMMENT THESE LINES TO GET YOUTUBE TO POP OUT
        // 	// if (isChrome && isIframe) {
        // 	// 	if (!youtubeIsPlaying){

        // 	// 		$("iframe").parent().css("transform", "none");
        // 	// 		$("iframe").css("transform", "none");
        // 	// 	}

        // 	// }
        // }

        ///STRESS TEST
        // this.renderer.render(this.scene, this.camera);


        stats.end();

        requestAnimationFrame(function () { game.animate(); });

    }
}

function lasers(bool) {
    lasersOn = bool;
    game.player.socket.emit('set lasers', lasersOn);
    console.log("starting");
}

function nameSecurity(bool) {

    game.player.socket.emit('name security', bool);

}

function startLasers() {

    if (!lasersInitialized) {

        var geometry = new THREE.CylinderBufferGeometry(2, 2, 2e4, 32);

        let nboflaser = 40,
            lasers = [],
            offets = [];
        for (var i = 0; i <= nboflaser; i++) {
            var cyl = new THREE.Mesh(geometry, game.laserMaterial);
            game.environment.children[0].add(cyl), lasers.push(cyl), cyl.translateY(-3e3), offets.push(Math.ceil(5e3 * Math.random()))
        }
        let rotateindex = 0;
        window.laserspeed = 1e3, setInterval(function () {
            var e = 0;
            lasers.forEach(t => {
                e++;
                var a = (rotateindex = ++rotateindex / window.laserspeed % 360) + offets[e];
                t.rotateX(a), t.rotateY(a)
            })
        }, 40), light2Intensity = .3, light1Intensity = .4;
        lasersInitialized = true;
    } else {
        game.laserMaterial.visible = true;
    }


    lasersOn = true;


}

function killLasers() {
    lasersOn = false;
    game.laserMaterial.visible = false;
}

function eyes(NAME) {

    if (NAME === false) { game.eyesMaterial.visible = false; } else {
        startEyes(NAME);

    }

    game.player.socket.emit('set eyes', NAME);

}

function big(name, size) {
    console.log(name, size);
    setSize(name, size);

    game.player.socket.emit('set size', { name: name, size: size, });

}

function setSize(name, size) {
    game.remotePlayers.forEach(e => { name === e.username && e.object.scale.set(size, size, size) });
    // console.log(username);
    if (name === username) {
        game.player.object.scale.set(size, size, size);
        if (size < 0.8) {
            game.camera.far = 2000;
            game.camera.updateProjectionMatrix();
        } else {
            game.camera.far = 800;
            game.camera.updateProjectionMatrix();
        }
    };

    if (name === "global") {
        game.remotePlayers.forEach(e => { e.object.scale.set(size, size, size) });
        game.player.object.scale.set(size, size, size);
        if (size < 0.8) {
            game.camera.far = 2000;
            game.camera.updateProjectionMatrix();
        } else {
            game.camera.far = 800;
            game.camera.updateProjectionMatrix();
        }
    }
}


function startEyes(NAME) {

    // console.log(NAME);
    var geometry = new THREE.CylinderBufferGeometry(0.09, 0.09, 2000, 32);


    var cylinder1 = new THREE.Mesh(geometry, game.eyesMaterial);
    cylinder1.rotateX(Math.PI / 2);
    var cylinder2 = new THREE.Mesh(geometry, game.eyesMaterial);
    cylinder2.rotateX(Math.PI / 2);


    // console.log(game.player.root);

    if (username === NAME) {
        game.player.root.children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].add(cylinder2);
        cylinder2.position.z = 1000;
        cylinder2.position.y = -2;
        cylinder2.position.x = 0.6;
        game.player.root.children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].add(cylinder1);
        cylinder1.position.z = 1000;
        cylinder1.position.y = -2;
        cylinder1.position.x = -0.6;
    }
    // console.log("added");

    game.remotePlayers.forEach(function (player) {

        if (player.username === NAME) {
            var cylinderCopy1 = cylinder1.clone();
            var cylinderCopy2 = cylinder2.clone();
            player.root.children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].add(cylinderCopy1);
            cylinderCopy1.position.z = 1000;
            cylinderCopy1.position.y = -2;
            cylinderCopy1.position.x = 0.4;

            player.root.children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].add(cylinderCopy2);
            cylinderCopy2.position.z = 1000;
            cylinderCopy2.position.y = -2;
            cylinderCopy2.position.x = -0.4;
        }

    });
    // console.log(NAME);
    if (NAME === true)

        if (!eyesOn) {
            game.remotePlayers.forEach(function (player) {


                var cylinderCopy1 = cylinder1.clone();
                var cylinderCopy2 = cylinder2.clone();
                player.root.children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].add(cylinderCopy1);
                cylinderCopy1.position.z = 1000;
                cylinderCopy1.position.y = -2;
                cylinderCopy1.position.x = 0.4;

                player.root.children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].add(cylinderCopy2);
                cylinderCopy2.position.z = 1000;
                cylinderCopy2.position.y = -2;
                cylinderCopy2.position.x = -0.4;



            });

            game.player.root.children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].add(cylinder2);
            cylinder2.position.z = 1000;
            cylinder2.position.y = -2;
            cylinder2.position.x = 0.6;
            game.player.root.children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0].add(cylinder1);
            cylinder1.position.z = 1000;
            cylinder1.position.y = -2;
            cylinder1.position.x = -0.6;

            light2Intensity = .3, light1Intensity = .4;

            eyesOn = true;
        }
    if (NAME === false) {
        game.eyesMaterial.visible = false;
        eyesOn = false;
    } else {
        game.eyesMaterial.visible = true;
    }
}

function createRandomDanceGenerator() {
    let lastDance = null;

    return function () {
        let randomDance;
        do {
            randomDance = 5 + Math.floor(Math.random() * 6); // Generates a number between 0 and 5
        } while (randomDance === lastDance);
        console.log(randomDance);
        lastDance = randomDance;
        return randomDance;
    };
}

const getRandomDance = createRandomDanceGenerator();

// Example usage
// console.log(getRandomDance()); // Generates a random number between 0 and 5
// console.log(getRandomDance()); // Generates another number, different from the last one





function exectScriptOnClients(script) {
    game.player.socket.emit("remoteexec", script);
}


//SECURITY CODE
function buf2hex(buffer) {
    var u = new Uint8Array(buffer),
        a = new Array(u.length),
        i = u.length;
    while (i--) // map to hex
        a[i] = (u[i] < 16 ? '0' : '') + u[i].toString(16);
    u = null;
    return a.join('');
};

async function adminRequest(passphrase) {
    var encoder = new TextEncoder();
    var data = encoder.encode(passphrase);
    var hash = await crypto.subtle.digest('SHA-256', data);
    var hexhash = buf2hex(hash);
    game.player.socket.emit("adminrequest", hexhash);
}

function getHash(input) {
    var hash = 0,
        len = input.length;
    for (var i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + input.charCodeAt(i);
        hash |= 0; // to 32bit integer
    }

    return hash;
}
class SpeechBubble {
    constructor(player, msg, size = 1) {


        this.config = { font: 'Helvetica', size: 24, padding: 10, colour: '#fff', width: 256, height: 256, nameWidth: 256, nameHeight: 32 };
        // console.log(player);
        const planeGeometry = new THREE.PlaneBufferGeometry(size, size);
        const planeMaterial = new THREE.MeshBasicMaterial()
        this.mesh = new THREE.Mesh(planeGeometry, planeMaterial);
        // this.mesh = player.speechMesh;
        this.mesh.renderOrder = 1;
        // this.mesh.Name = "Bubble"; 
        this.mesh.castShadow = false;
        player.object.add(this.mesh);
        // this.mesh = "speech-bubble";
        // console.log("adding speech bubble", )

        const self = this;
        const loader = new THREE.TextureLoader(loadingManager);

        loader.load(
            // resource URL
            `assets/images/name.png`,

            // onLoad callback
            function (texture) {
                // in this example we create the material when the texture is loaded
                self.img = texture.image;
                self.mesh.material.map = texture;
                self.mesh.material.opacity = 0.0;
                self.mesh.material.transparent = true;
                self.mesh.castShadow = false;
                self.mesh.material.needsUpdate = true;
                self.mesh.material.polygonOffset = true;
                self.mesh.material.polygonOffsetFactor = .1;
                self.mesh.material.depthTest = false;
                self.mesh.renderOrder = 999;
                self.mesh.name = "speechBubble";
                if (msg !== undefined) self.update(msg);
            },

            // onProgress callback currently not supported
            undefined,

            // onError callback
            function (err) {
                console.error('An error happened.');
            }
        );



        const nameGeometry = new THREE.PlaneBufferGeometry(16, 12 * 0.06); //namesize
        const nameMaterial = new THREE.MeshBasicMaterial()
        this.nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);

        // this.nameMesh = player.nameMesh;
        this.nameMesh.castShadow = false;
        this.nameMesh.renderOrder = 3;
        player.object.add(this.nameMesh);

        // const self = this;
        loader.load(
            // resource URL
            `assets/images/name.png`,

            // onLoad callback
            function (nameTexture) {
                // in this example we create the material when the texture is loaded
                self.nameMesh.img = nameTexture.image;
                self.nameMesh.material.map = nameTexture;
                //self.nameMesh.material.opacity = 0.9;
                self.nameMesh.material.transparent = true;
                self.nameMesh.material.needsUpdate = true;
                self.nameMesh.material.polygonOffset = true;
                self.nameMesh.material.polygonOffsetFactor = -0.1;
                self.nameMesh.name = "nameMesh";

            },

            // onProgress callback currently not supported
            undefined,

            // onError callback
            function (err) {
                console.error('An error happened.');
            }
        );

        const pointsGeometry = new THREE.PlaneBufferGeometry(size, size * 0.04);
        const pointsMaterial = new THREE.MeshBasicMaterial();
        this.pointsMesh = new THREE.Mesh(pointsGeometry, pointsMaterial);
        // this.pointsMesh = player.pointsMesh;
        this.pointsMesh.castShadow = false;
        this.pointsMesh.renderOrder = 3;
        player.object.add(this.pointsMesh);

        // const self = this;
        loader.load(
            // resource URL
            `assets/images/name.png`,

            // onLoad callback
            function (pointsTexture) {
                // in this example we create the material when the texture is loaded
                self.pointsMesh.img = pointsTexture.image;
                self.pointsMesh.material.map = pointsTexture;
                self.pointsMesh.material.opacity = 0.9;
                self.pointsMesh.material.transparent = true;
                self.pointsMesh.material.needsUpdate = true;
                self.pointsMesh.material.polygonOffset = true;
                self.pointsMesh.material.polygonOffsetFactor = -0.1;
                self.pointsMesh.name = "pointsMesh";

            },

            // onProgress callback currently not supported
            undefined,

            // onError callback
            function (err) {
                console.error('An error happened.');
            }
        );


    }
    updatePoints(points) {
        if (points === 0) {
            points = "";
        }
        if (this.pointsMesh === undefined) return;

        if (this.pointsMesh.material.map == null) {
            //console.log("undefined");
            //console.log(this.pointsMesh.material.map);

        } else {
            // console.log(this.nameMesh.img);
            // console.log("dispose old points");
            this.pointsMesh.material.map.dispose();
            // this.nameMesh.img.dispose;
        }

        let context = this.context;

        if (this.pointsMesh.userData.context === undefined) {
            const canvas = this.createOffscreenCanvas(this.config.nameWidth, this.config.nameHeight);
            this.pointsMesh.context = canvas.getContext('2d');
            context = this.pointsMesh.context;
            context.font = `18pt ${this.config.font}`;
            // context.fillText('Some text', 50, 50);
            // context.strokeText('Some text', 50, 50);
            context.fillStyle = "#ffffff";
            context.strokeStyle = "#FFffff";
            context.lineWidth = 3;
            context.textBaseline = "bottom";
            // context.strokeRect(10,10, 100,100);
            //context.fillStyle = "#ff33cc";
            context.textAlign = 'center';
            this.pointsMesh.material.map = new THREE.CanvasTexture(canvas);
            this.pointsMesh.material.map.dispose();
        }
        // console.log("nameMesh", this.nameMesh);

        if (this.pointsMesh.img === undefined) return;

        const bgMesh = this.pointsMesh.img;
        // console.log("bgMesh", bgMesh);
        context.clearRect(0, 0, this.config.nameWidth, this.config.nameWidth * 0.05);

        context.drawImage(bgMesh, 0, 0, bgMesh.width, bgMesh.weight, 0, 0, this.config.nameWidth, this.config.nameWidth * 0.05);

        //	this.wrapText(points, context);
        //this.wrapTextOutline(points, context);
        // console.log(context);
        context.strokeStyle = 'white';
        context.lineWidth = 2;
        context.fillText(points, 128, 32);
        context.strokeText(points, 128, 32);
        // this.nameMesh.material.map.needsUpdate = true;
        this.pointsMesh.material.dispose();
        // console.log(this);
        this.pointsUpdated = true;


    }

    updateName(name) {
        //canvas.dispose();
        if (this.nameMesh === undefined) return;

        if (this.nameMesh.material.map == null) {
            // console.log("undefined");
            // console.log(this.nameMesh.material.map);

        } else {
            // console.log("dispose old name", name);
            this.nameMesh.material.map.dispose();
            // this.nameMesh.img.dispose;
        }

        let context = this.context;

        if (this.nameMesh.userData.context === undefined) {
            // const canvas = this.createOffscreenCanvas(256*2, 36*1.3);
            const canvas = this.createOffscreenCanvas(512, 46);
            this.nameMesh.context = canvas.getContext('2d');
            context = this.nameMesh.context;
            //context.font = `${this.config.size}pt ${this.config.font}`;
            context.font = `bold 28pt "Helvetica" `; //namesize
            //context.textBaseline = "top";
            context.fontStyle = "bold";

            context.fillStyle = "white";
            context.textBaseline = "middle";

            // context.strokeStyle = "#FF0000";

            context.textAlign = 'center';
            this.nameMesh.material.map = new THREE.CanvasTexture(canvas);
            this.nameMesh.material.map.dispose();
        }
        // console.log("nameMesh", this.nameMesh);

        if (this.nameMesh.img === undefined) return;

        const bgMesh = this.nameMesh.img;
        // console.log("bgMesh", bgMesh);
        context.clearRect(0, 0, this.config.nameWidth, this.config.nameHeight);

        context.drawImage(bgMesh, 0, 0, bgMesh.width, bgMesh.height, 0, 0, this.config.nameWidth, this.config.height);

        //context.fillStyle = 'red';

        context.strokeStyle = 'white';
        context.lineWidth = 2;

        context.strokeText(name, 256, 28);
        context.fillText(name, 256, 28);


        // this.nameMesh.material.map.needsUpdate = true;
        this.nameMesh.material.dispose();
        // console.log(this);
        this.nameUpdated = true;

    }

    update(msg) {
        if (this.mesh === undefined) return;

        if (this.mesh.material.map == null) {
            // console.log("undefined");
            // console.log(this.nameMesh.material.map);

        } else {
            // console.log("dispose old msg", msg);
            this.mesh.material.map.dispose();
            // this.nameMesh.img.dispose;
        }

        let context = this.context;

        if (this.mesh.userData.context === undefined) {
            const canvas = this.createOffscreenCanvas(this.config.width, this.config.height);
            this.context = canvas.getContext('2d');
            context = this.context;
            context.font = `15pt ${this.config.font}`;
            context.fillStyle = this.config.colour;
            context.textAlign = 'center';
            context.textBaseline = "middle";
            this.mesh.material.map = new THREE.CanvasTexture(canvas);
        }

        const bg = this.img;
        context.clearRect(0, 0, this.config.width, this.config.height);
        context.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, this.config.width, this.config.height);
        this.wrapText(msg, context);

        this.mesh.material.map.needsUpdate = true;

    }



    createOffscreenCanvas(w, h) {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        return canvas;
    }

    wrapText(text, context) {
        //console.log(text);
        const words = text.split(' ');
        let line = '';
        const lines = [];
        const maxWidth = this.config.width - 2 * this.config.padding;
        //const lineHeight = this.config.size + 8;
        const lineHeight = this.config.size;
        words.forEach(function (word) {
            const testLine = `${line}${word} `;
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth) {
                lines.push(line);
                line = `${word} `;
            } else {
                line = testLine;
            }
        });

        if (line != '') lines.push(line);

        let y = (this.config.height - lines.length * lineHeight) / 2;

        lines.forEach(function (line) {
            context.fillText(line, 128, y);
            y += lineHeight;
        });
    }
    wrapTextOutline(text, context) {
        const words = text.split(' ');
        let line = '';
        const lines = [];
        const maxWidth = this.config.width - 2 * this.config.padding;
        const lineHeight = this.config.size + 8;

        words.forEach(function (word) {
            const testLine = `${line}${word} `;
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth) {
                lines.push(line);
                line = `${word} `;
            } else {
                line = testLine;
            }
        });

        if (line != '') lines.push(line);

        let y = (this.config.height - lines.length * lineHeight) / 2;

        lines.forEach(function (line) {
            // context.fillText(line, 128, y);
            context.fillStyle = 'black';
            context.strokeStyle = 'white';

            context.strokeText(line, 128, y);
            context.fillText(line, 128, y);
            y += lineHeight;
        });
    }

    show(pos) {

        //postion of message mesh
        // console.log('tilting speech bwubble');
        // if (this.mesh!==undefined){
        //	this.mesh.position.set(this.player.object.position.x , this.player.object.position.y + 700, this.player.object.position.z);
        // this.mesh.postion.y
        this.mesh.lookAt(pos);
        this.nameMesh.lookAt(pos);
        this.pointsMesh.lookAt(pos);
        // }
    }
}

class Player {
    constructor(game, options) {
        this.local = true;

        // this.nextposition;
        // this.nextrotation;
        // this.nextaction;

        let model, colour, shader

        if (options === undefined) {

            const people = ['boy9_2'];
            model = people[Math.floor(Math.random() * people.length)];
        } else if (typeof options == 'object') {
            this.local = false;
            this.options = options;
            this.id = options.id;
            //model = options.model;
            const people = ['boy9_2'];
            model = people[Math.floor(Math.random() * people.length)];

        } else {
            //	model = options;
            const people = ['boy9_2',];
            model = people[Math.floor(Math.random() * people.length)];
        }


        // shader = materials[Math.floor(Math.random()*materials.length)];

        // console.log(this.id);


        this.model = model;
        this.game = game;
        this.animations = this.game.animations;

        // const loader2 = new THREE.FBXLoader2( loadingManager );
        // const loader2 = new THREE.GLTFLoader( loadingManager );
        const player = this;

        var matcapMaterial = new THREE.MeshMatcapMaterial({
            color: 0xffffff,
            matcap: game.blackTexture,
            skinning: true,

        });

        loaderGLTF.load(`${game.assetsPath}fbx/people/${model}.glb`, function (object) {
            //loaderGLTF.load( `${game.assetsPath}fbx/people/${model}.fbx`, function ( object ) {

            // shader = materials[player.id % materials.length];


            // var numericalId = getHash(player.id );
            // if (numericalId < 0) numericalId = -numericalId;

            // var shaderIndex = numericalId % materials.length;
            // var randomShader = materials[shaderIndex];
            var randomShaderIndex = Math.floor(Math.random() * game.materials.length);
            var randomShader = game.materials[randomShaderIndex];


            // // var abs = Math.abs(yo);

            if (player.local) {


                player.shaderIndex = randomShaderIndex;

                // console.log(player.shaderIndex);
                player.shroomActivated = false;
                player.root = object.scene;
                player.object = new THREE.Object3D();
                player.object.shaderIndex = randomShaderIndex;
                // player.object.rotation.set(0, 3, 0);
                object.scene.scale.multiplyScalar(100);
                var positionRandomZ = Math.floor(Math.random() * 150 * -1);
                var positionRandomX = Math.floor(Math.random() * 113 - 80);

                // -80 - 33
                // console.log()
                //player.object.position.set(0, 3, -positionRandom);
                player.object.position.set(positionRandomX, 3, positionRandomZ);
                //player.object.position.set(-180, 3, -80);
                var newDir = new THREE.Vector3(-60, 3, -80);
                // var position = new THREE.Vector3();
                // position.addVectors(newDir, player.object.position);
                player.object.lookAt(newDir);





                object.scene.mixer = new THREE.AnimationMixer(object.scene);
                player.mixer = object.scene.mixer;
                // player.mixer.addEventListener( 'finished', function( e ) { player.jump = false; player.isJumping = false; game.playerControl(fwd,turn); game.player.jumpTime = 0.0; } );

                object.scene.traverse(function (child) {
                    // if ( child.isMesh ) {
                    // 	child.castShadow = true;
                    // 	child.receiveShadow = false;
                    // 	child.material.color = new THREE.Color( 0xffffff );
                    // }
                    if (child.isSkinnedMesh) {
                        player.shaderIndex = randomShaderIndex;
                        child.material = game.materials[player.shaderIndex];

                        child.geometry.computeBoundingBox();
                        // console.log(child.geometry.boundingBox);
                        // child.material = matcapMaterial;
                        // child.castShadow = true;
                        // child.receiveShadow = false;

                        child.material.morphTargets = true;
                        // child.material.visible = false;

                    }
                    child.frustumCulled = false;
                });

                player.object.name = "local player";
                player.object.add(object.scene);



                //morphtargets
                // const pointsMaterial = new THREE.PointsMaterial( {

                // 		size: 10,
                // 		sizeAttenuation: false,v
                // 		map: new THREE.TextureLoader().load( 'assets/images/disc.png' ),
                // 		alphaTest: 0.5,
                // 		morphTargets: true

                // 	} );

                // const points = new THREE.Points( player.object.geometry, pointsMaterial );


                // points.morphTargetInfluences = player.object.morphTargetInfluences;
                // points.morphTargetDictionary = player.object.morphTargetDictionary;

                // player.object.add( points );

                // player.object.morphTargetInfluences = 100;


                if (player.deleted === undefined) game.scene.add(player.object);

                game.createCameras();
                // if (game.sun1 !== undefined) {
                // 	game.sun1.target = game.player.object;
                // }
                if (player.initSocket !== undefined) player.initSocket();
                const geometry = new THREE.BoxBufferGeometry(100, 460, 100);
                const material = new THREE.MeshBasicMaterial({ fog: true, color: 0xa0a0a, visible: false, transparent: true, opacity: 0.5 });
                const box = new THREE.Mesh(geometry, material);
                // box.visible = false;
                box.name = "ColliderLocal";
                box.position.set(0, 8, 0);
                box.scale.multiplyScalar(0.1);
                player.object.add(box);
                player.collider = box;
                player.collider.geometry.computeBoundingBox();

                player.object.userData.id = player.id;


                // const speechGeometry = new THREE.PlaneBufferGeometry(24, 24);
                // const speechMaterial = new THREE.MeshBasicMaterial()
                // player.speechMesh = new THREE.Mesh(speechGeometry, speechMaterial);


                // const nameGeometry = new THREE.PlaneBufferGeometry(16, 12*0.06); //namesize
                // const nameMaterial = new THREE.MeshBasicMaterial()
                // player.nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);

                // const pointsGeometry = new THREE.PlaneBufferGeometry(24, 1);
                // const pointsMaterial = new THREE.MeshBasicMaterial()
                // player.pointsMesh = new THREE.Mesh(pointsGeometry, pointsMaterial);
                // if (player.local) { 
                if (!isMobile) {
                    game.camera.position.set(0, 20, -10);

                    if (useMouseHeading) {
                        game.scene.add(game.camera);
                    } else {
                        game.player.object.add(game.camera);
                    }
                } else {
                    game.camera.position.set(0, 20, -10);
                    game.player.object.add(game.camera);
                }
                // }

            } else {

                const clonedFBX = THREE.SkeletonUtils.clone(game.player.object.children[0]);

                player.root = clonedFBX;

                player.object = new THREE.Object3D();


                player.object.name = "cloned player";
                player.object.shroomActivated = false;
                clonedFBX.mixer = new THREE.AnimationMixer(clonedFBX);
                player.mixer = clonedFBX.mixer;
                player.object.add(clonedFBX);

                clonedFBX.traverse(function (child) {
                    if (child.isSkinnedMesh) {
                        player.shaderIndex = randomShaderIndex;
                        player.object.shaderIndex = randomShaderIndex;
                        child.material = game.materials[player.shaderIndex];
                        //child.material = game.shroomMaterial;
                        // child.material = new THREE.MeshMatcapMaterial( { color: 0xffffff, } );
                        // child.material.matcap = game.blackTexture;
                        // child.material.skinning = true;
                        // child.castShadow = true;
                        // child.receiveShadow = false;
                    }
                });

                if (player.deleted === undefined) game.scene.add(player.object);

                // const geometry = new THREE.BoxGeometry(100,400,100);
                // const material = new THREE.MeshBasicMaterial({visible:false, opacity:0.2, transparent: false});
                // const box = new THREE.Mesh(geometry, material);
                // console.log(game.player.object);
                const box = game.player.object.children[1].clone();
                box.name = "Collider";
                box.visible = false;
                box.position.set(0, 8, 0);
                box.scale.multiplyScalar(0.1);
                player.object.add(box);
                player.collider = box;
                player.collider.geometry.computeBoundingBox();
                game.playerColliders.push(player.collider);


                player.object.userData.id = player.id;
                // player.object.userData.name = player.name;
                player.object.userData.remotePlayer = true;
                const players = game.initialisingPlayers.splice(game.initialisingPlayers.indexOf(this), 1);
                game.remotePlayers.push(players[0]);


                // player.speechMesh = game.player.speechMesh.clone();
                // player.nameMesh = game.player.nameMesh.clone();
                // player.pointsMesh = game.player.pointsMesh.clone();


                // const speechGeometry = game.player.speechMesh.geometry.clone();
                // const speechMaterial = new THREE.MeshBasicMaterial();
                // player.speechMesh = new THREE.Mesh(speechGeometry, speechMaterial);


                // const nameGeometry = game.player.nameMesh.geometry.clone();
                // const nameMaterial = new THREE.MeshBasicMaterial()
                // player.nameMesh = new THREE.Mesh(nameGeometry, nameMaterial);

                // const pointsGeometry = game.player.spointsMesh.geometry.clone();
                // const pointsMaterial = new THREE.MeshBasicMaterial()
                // player.pointsMesh = new THREE.Mesh(pointsGeometry, pointsMaterial);


            }



            player.speechBubble = new SpeechBubble(player, "", 10);

            // player.speechBubble.mesh.position.set(0, 31, 0);
            // player.speechBubble.nameMesh.position.set(0, 28.5, 0);
            player.speechBubble.mesh.position.set(0, 33.5, 0);
            player.speechBubble.mesh.castShadow = false;
            player.speechBubble.nameMesh.position.set(0, 32.0, 0);
            player.speechBubble.pointsMesh.position.set(0, 31.5, 0);



            // if (name != undefined){
            // 	console.log("updating name speech bubble");
            // 	player.speechBubble.updateName(name);
            // 	console.log("updating name speech bubble");
            // }

            //Doesnt Help?

            // setTimeout(function(){ 
            // 	// console.log("name",name);
            // 	// console.log("name defined?",name != undefined);
            // 	if (name != undefined){
            // 		// console.log("updating name speech bubble");
            // 		player.speechBubble.updateName(name);
            // 		// console.log("name speech bubble set");
            // 	}
            // }, 300);




            //if (game.animations.Idle!==undefined) player.action = animsLookup[0];


        });


    }

    set action(name) {
        //Make a copy of the clip if this is a remote player
        // console.log(name);
        if (this.actionName == name) return;
        this.actionName = name;
        this.actionTime = Date.now();


        const clip = (this.local) ? this.animations[name] : THREE.AnimationClip.parse(THREE.AnimationClip.toJSON(this.animations[name]));

        if (this.mixer === undefined) return;
        // console.log(animsLoaded);
        if (!animsLoaded | !loadingScreenFaded) return;
        // console.log(this.mixer);
        const action = this.mixer.clipAction(clip);


        if (this.current_action) {
            this.current_action.fadeOut(0.2);
        }

        action.reset();
        action.fadeIn(0.2);
        action.play();
        if (this.actionName == "Running Forward Flip") {
            action.loop = THREE.LoopOnce;
            action.warp(1.5, 1.4, 10.1);


            // console.log(game.player.object.position);
            // console.log('loop once');
        }

        this.current_action = action;
        this.mixer.name = name;
        // this.player.action.

        // console.log(name);


    }


    get action() {
        return this.actionName;
    }



    PlayerReady() {
        return this.nextposition != undefined && this.nextposition != undefined && this.nextaction != undefined;
    }

    update(dt) {
        if (this.PlayerReady() == true) {
            this.mixer.update(dt);
            this.object.position.set(this.nextposition.x, this.nextposition.y, this.nextposition.z);
            this.object.quaternion.setFromEuler(this.nextrotation);


            this.action = animsLookup[this.nextaction];

            //Remote Player speech bubble towards camera
            if (this.speechBubble != undefined) {
                if (!isMobile) {
                    this.speechBubble.show(game.camPosition);
                } else {
                    this.speechBubble.show(game.camPosition);
                }
            }
        }
    }
}
//TO DO: FIND A WAY TO RECONNECT SOCKET ON DEVICE WAKE
// function reconnectSocket(event){
// 	console.log('reconnecting');
// 	socket = io.connect();
// 	socket.emit('reconnect', name);

// }	
$('#name-form').submit(function () {
    name = $('#nameInput').val().toUpperCase();
    // console.log ("name set", name);
    $('.name').hide();
    $("#nameInput").blur();
    //   $('#nameInput').val('');
    document.activeElement.blur();
    $("#nameInput").blur();
    game.playerControl(0, 0);
    fwd = 0;
    //   console.log("blur");

    //   var hideKeyboard = function(){

    //   }
    selected = false;
    return false;
});

function getName(id) {
    // socket = io.connect();
    this.socket.emit('getName', id);

};




//DISCONNECT ON IDLE 
showScores = function () {


    $("#gamelog").empty();
    $("#gamelog").append(
        // "<center><b>TOP 5:</b><br></center>" 
        // "<table id='hiscore' class='stretch'  style='margin-left: auto; margin-right: auto;'> <tr><th align=right>NAME &nbsp &nbsp </th><th align=left> &nbsp &nbsp SCORE</th></tr></table>"
        // "<table id='hiscore' style='margin-left: auto; margin-right: auto;'> <tr><th  class='stretch'   align=left>NAME &nbsp &nbsp </th><th  class='stretch'   align=right> &nbsp &nbsp SCORE</th></tr></table>"
        "<br><div id='tablediv'><table id='hiscore' style='margin-left: auto; margin-right: auto;'> <tr><th   align=left><span style='font-weight: bold; size:15px' class='stretchLeft'>NAME &nbsp &nbsp </span></th><th align=right> <span style='font-weight: bold; size:15px'  class='stretchRight'>&nbsp &nbsp SCORE</span></th></tr></table></div>"
        // "<table id='hiscore' style='margin-left: auto; margin-right: auto;'> </table>"
    );

    for (var i = 0; i < currentScores.length; i++) {
        $("#hiscore").append(
            "<tr><td width='500px'   align=left><span style='size:9px' class='stretchLeft'>" + currentScores[i].name + " &nbsp &nbsp " + "</span></td> <td   width='500px' align=right><span style='size:9px' class='stretchRight'>" + " " + "  &nbsp " + " " + " &nbsp &nbsp " + currentScores[i].score + "</span></td></tr> <br>"
        );
    }
    // console.log({currentScores});
    // console.log({scores});
    // for (var i = 0; i < scores.length ; i++)
    // {   
    // 	$("#hiscore").append(
    // 	"<tr><td width='500px'   align=left><span style='size:13px' class='stretchLeft'>" + currentScores[i].name + " &nbsp &nbsp " + "</span></td> <td   width='500px' align=right><span style='size:13px' class='stretchRight'>"+ " " + "  &nbsp " + " " + " &nbsp &nbsp " + currentScores[i].score +  "</span></td></tr> <br>" 
    // 	);
    // }
    // $("#hiscore").prepend(
    // 	"<tr><td width='500px' align=right>" + currentScores[0].name + "</td> <td width='500px' align=left>" + currentScores[0].score + "</td></tr> <br>" 
    // 	);
    $("#gamelog").stop(false, true);
    $("#gamelog").show();
    $("#gamelog").delay(2000).fadeOut(4000, 'swing');
    showingScores = true;
}

showGlobalScores = function () {
    $("#gamelog").empty();
    $("#gamelog").append(
        // "<center><b>TOP 5:</b><br></center>" 
        // "<table id='hiscore' style='margin-left: auto; margin-right: auto;'> <tr><th>NAME</th><th>SCORE</th></tr></table>"
        "<table id='hiscore' style='margin-left: auto; margin-right: auto;'> </table>"
    );
    for (var i = 10; i < scores.length && i >= 0; i--) {
        $("#hiscore").prepend(
            "<tr><td width='500px' align=right>" + scores[i].name + "</td> <td width='500px' align=left>" + scores[i].score + "</td></tr> <br>"
        );
    }
};




startEngines = function () {
    enginesStarted = true;
    console.log("starting engines");
    if (!tooltipShown) {
        if (isMobile) {
            showTitle("SWIPE UP TO JUMP, TOUCH & HOLD TO DANCE");
        } else {
            showTitle("SPACE TO JUMP, CLICK TO DANCE");
        }
        tooltipShown = true;
    }

    if (!twitchLoaded && twitchMode) {
        twitch(twitchId);

        twitchLoaded = true;
    }



    if (!audioContextStarted) {


        // Shoot the laser!
        game.sound.play('nothing');



        audioContextStarted = true;
    }



    if (!playInitialized && !youtubeMode && audioContextStarted && !twitchMode) {

        if (kicked) return;
        console.log("starting player");
        if (ffplayer.song.getState() != "playing") {
            ffplayer.playSong(songIndex);
            ffplayer.song.setVolume(0.8);
        }


        playInitialized = true;
        // setTimeout(function() {
        //     // game.sound.stop()
        // }, 1000);
    }
    if (!youtubeIsPlaying && youtubeApiLoaded && youtubeMode) {
        console.log('start video');
        if (kicked) return;
        // if (!game.sound.isPlaying && !game.sound2.isPlaying) {
        // 	// game.sound.play();
        // 	// game.sound.setVolume(0.0);
        // 	// game.sound.muted = true;
        // 	// game.sound2.play();
        // 	// game.sound2.muted = true;
        // 	// game.sound2.setVolume(0.0);
        // }

        playInitialized = true;
        // setTimeout(function () {
        // 	// game.sound.stop()
        // }, 3000);

        if (youtubePlayer === undefined) return;

        if (isChrome && isIframe) {
            showTitle('DOUBLE CLICK PLAY BUTTON');
            youtubePrompt('DOUBLE CLICK PLAY BUTTON');
        } else {
            console.log("playing")
            playYoutube();
        }

    }
};

// CREATE LOCAL PLAYER

class PlayerLocal extends Player {
    constructor(game, model) {
        super(game, model);

        const player = this;
        //   const socket = io.connect("http://localhost:3000");

        // const socket = io.connect('http://localhost:3000', {
        //     transports: ['websocket'],
        //     cors: {
        //         origin: "http://localhost:5500",
        //         credentials: true
        //     }
        // });

        // Replace it with:
        const socket = io('https://club-3d-be.onrender.com', {
            transports: ['websocket'],
            upgrade: false,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        // Keep the error handling
        socket.on('connect_error', (error) => {
            console.log('Connection error:', error);
        });

        socket.on('connect', () => {
            console.log('Connected to server!');
        });


        // const socket = io.connect();
        // console.log('name defined?', name != undefined);
        // console.log('socket connected', socket.connected);


        $('#name-form').submit(function () {
            username = $('#nameInput').val().toUpperCase();

            if (username != undefined && socket.connected) {
                console.log('set username', username);
                socket.emit('set username', username);
                //socket.emit('set username', name);
                player.speechBubble.updateName(username);
            }
            $('.name').hide();
            $("#nameInput").blur();
            fwd = 0;
            game.playerControl(0, 0);
            selected = false;
            return false;
        });

        if (username != undefined && socket.connected) {
            socket.emit('set username', username);
            player.speechBubble.updateName(username);
            console.log('setting name before init');
        }

        socket.on('setId', function (data) {
            player.id = data.id;
            //	console.log("setId");
        });

        socket.on('lasers', function (data) {

            if (data.lasers) {
                startLasers();
            } else {
                killLasers();
                // console.log("killLasers");
            }
        });

        socket.on('eyes', function (data) {
            // console.log("startEyes", data.eyes);
            startEyes(data.eyes);
        });

        socket.on('size', function (data) {
            // console.log(data.name, data.size);
            setSize(data.name, data.size);
        });



        socket.on('exec', function (code) {
            evaluate(code);
        });

        socket.on('remoteData', function (data) {
            window.totalticks++;
            window.tickspersecond = window.totalticks / (performance.now() / 1000);
            game.remoteData = data;
            if (!loadingScreenFaded) return;
            game.updateRemotePlayers();
        });
        // socket.on('name', function(data){
        // 	if (data.id === game.player.id) return;
        // 	const player = game.getRemotePlayerById(data.id);
        // 	player.username =  data.name;
        // 	console.log("new name",player, data.name);
        // 	player.speechBubble.updateName(data.name);
        // });
        socket.on('kicked', function (data) {
            console.log('KICKED!');
            kicked = true;
            if (!loadingScreenFaded) {
                // $.when(onTransitionEnd()).then(disconnectPlayer(data.text));
            } else {
                disconnectPlayer(data.text);
            }
            // disconnectPlayer(data.text);
            //showTitle("FROM SERVER");
        });

        socket.on('get name', function (data) {

            //ON SOCKET CONNECT GET YOUR OWN NAME (IF YOU DISCONNECT FOR SOME REASON WITH BROWSER OPEN)
            if (username != undefined) {

                console.log('setting name', username);
                socket.emit('set username', username);


                //
                // socket.emit('get shaders', name);
                socket.emit("get shaders", game.player.shaderIndex);

            }

        });



        socket.on('deletePlayer', function (data) {
            // console.log(game.playerColliders);
            const players = game.remotePlayers.filter(function (player) {
                if (player.id == data.id) {
                    return player;
                }
            });

            if (players.length > 0) {
                let index = game.remotePlayers.indexOf(players[0]);
                // console.log(index);
                if (index != -1) {
                    // console.log(players[0].object);
                    // game.remotePlayers.indexOf(players[0]) = undefined; //test


                    //SINJIN DISPOSE CODE
                    // players[0].object.traverse(function (child) {
                    // 	if (child.isSkinnedMesh) {
                    // 		child.geometry.dispose;
                    // 		child.dispose;
                    // 	}

                    // });
                    // players[0].object.children[0].dispose;
                    // players[0].object.children[1].dispose;
                    // players[0].object.children[2].dispose;
                    // players[0].object.children[3].dispose;
                    // players[0].object.children[4].dispose;
                    // players[0].collider.geometry.dispose;
                    // players[0].object.dispose; 

                    //COLLIDERS DISPOSE
                    game.playerColliders[index].traverse(function (c) {
                        if (c.geometry) {
                            c.geometry.dispose();
                            c.geometry = null;
                            //  console.log('removing collider geometry');

                        }
                        if (c.material) {
                            if (c.material.length) {
                                for (let i = 0; i < c.material.length; ++i) {

                                    if (c.material[i].texture != undefined) {
                                        c.material[i].texture.dispose();
                                    }
                                    c.material[i].dispose();

                                    c.material = null;
                                    // console.log('removing materials');
                                }
                            } else {

                                if (c.material.texture != undefined) {
                                    c.material.texture.dispose();
                                }
                                c.material.dispose();

                                c.material = null;
                                // console.log('removing material');
                            }
                        }
                    });

                    game.playerColliders[index].parent.remove(game.playerColliders[index]);
                    game.playerColliders[index] = null;
                    game.playerColliders.splice(index, 1);
                    game.renderer.renderLists.dispose();

                    //LOUIS DISPOSE CODE
                    game.remotePlayers[index].object.traverse(function (c) {
                        if (c.geometry) {
                            c.geometry.dispose();
                            c.geometry = null;
                            // console.log('removing geometry');

                        }
                        if (c.material) {
                            if (c.material.length) {
                                for (let i = 0; i < c.material.length; ++i) {

                                    if (c.material[i].texture != undefined) {
                                        c.material[i].texture.dispose();
                                    }
                                    c.material[i].dispose();

                                    c.material = null;
                                    // console.log('removing materials');
                                }
                            } else {

                                if (c.material.texture != undefined) {
                                    c.material.texture.dispose();
                                }
                                c.material.dispose();

                                c.material = null;
                                // console.log('removing material');
                            }
                        }
                    });
                    // game.playerColliders.dispose();
                    // game.playerColliders = null;
                    game.remotePlayers[index].object.parent.remove(game.remotePlayers[index].object);
                    game.remotePlayers[index].object.parent = null;
                    game.remotePlayers[index].object = null;
                    // players[0].object.parent.remove(players[0].object);
                    // game.scene.remove(players[0].object);
                    players[0].object = null;
                    game.remotePlayers.splice(index, 1);
                    game.renderer.renderLists.dispose();



                    // console.log(game.playerColliders[index]);
                    // game.remotePlayers[index].object = null;


                }
                // console.log(game.remotePlayers);
            } else {
                let index = game.initialisingPlayers.indexOf(data.id);
                if (index != -1) {
                    const player = game.initialisingPlayers[index];
                    player.deleted = true;
                    game.initialisingPlayers.splice(index, 1);
                }
            }
        });

        socket.on('set shroom', function (shroom) {
            // console.log(shroom.id);
            if (player.id == shroom.id) {

            } else {
                //	console.log(shroom);

                if (!superShroom) {
                    const remotePlayer = game.getRemotePlayerById(shroom.id);
                    game.superShroom(remotePlayer);
                    remotePlayer.object.shroomActivated = true;

                    shroomOver = function () {
                        remotePlayer.object.shroomActivated = false;
                        // game.player.points = 0;
                    }
                    setTimeout(function () {
                        shroomOver();
                    }, 10000);
                }
            }
        });

        socket.on('set acid', function (acid) {
            // console.log(shroom.id);
            if (player.id == acid.id) {

            } else {
                //	console.log(shroom);
                const remotePlayer = game.getRemotePlayerById(acid.id);
                game.acid(remotePlayer);
                remotePlayer.object.acid = true;

                acidOver = function () {
                    remotePlayer.object.acid = false;
                    // game.player.points = 0;
                }
                setTimeout(function () {
                    acidOver();
                }, 10000);
            }
        });

        socket.on('globalShroomIndex', function (data) {
            //console.log(data);
            //console.log(data);

            shroomIndex = data;


            // if shroom is activated put it out of reach
            if (superShroom) {
                game.shroom.scene.position.set(positionShroom[shroomIndex].x, 150, positionShroom[shroomIndex].z)
            } else {
                game.shroom.scene.position.set(positionShroom[shroomIndex].x, positionShroom[shroomIndex].y, positionShroom[shroomIndex].z)
            }

            //DELETE THIS
            //	game.shroom.scene.position.set(positionShroom[0].x, positionShroom[0].y, positionShroom[0].z)
        });
        socket.on('populate names', function (data) {
            // console.log('populate names', data);
            if (data.id === game.player.id) return;
            var namedata = data;

            namedata.forEach(function (data) {
                // game.remotePlayers.forEach( function(player){
                // 	console.log(data);
                //	console.log(data);
                if (data.name === undefined) return;
                const player = game.getRemotePlayerById(data.id);
                // if (player.username === undefined)return;
                player.username = data.name;
                //	console.log("new name",player, data.name);
                player.speechBubble.updateName(data.name);
                // });
            });
        });
        socket.on('populate shaders', function (data) {


            var shaderdata = data;

            shaderdata.forEach(function (data) {

                if (data.id === game.player.id) return;

                const player = game.getRemotePlayerById(data.id);

                if (player === undefined) return;

                player.object.traverse(function (child) {
                    if (child.isSkinnedMesh) {
                        if (data.shader === undefined) return;

                        player.shaderIndex = data.shader;
                        player.object.shaderIndex = data.shader;

                        var newMaterial = game.materials[data.shader];
                        if (newMaterial === undefined) return;
                        child.material = newMaterial;
                    }

                });

            });
        });
        socket.on('name', function (data) {
            if (data.id === game.player.id) return;
            const player = game.getRemotePlayerById(data.id);
            if (player === undefined) return;
            player.username = data.name;
            //	console.log("new name",player, data.name);
            player.speechBubble.updateName(data.name);
        });

        socket.on('points', function (data) {
            //console.log(data);
            if (data.id === game.player.id) return;
            //	console.log(data);
            const player = game.getRemotePlayerById(data.id);
            if (player === undefined) return;
            // player.points =  data.points;
            //	console.log("new name",player, data.name);
            // player.speechBubble.updateName(data.name);
            player.speechBubble.updatePoints(data.points);
        });

        socket.on('winnerNameChange', function (data) {
            //scores = data.winners;
            currentScores = data.currentWinners;
            //showScores();

        });

        socket.on('winner', function (data) {
            game.player.points = 0;
            console.log(data.id);

            //CRAZY MATCAP SHADER ON LOCAL WINNER
            // if (data.id === game.player.id){
            // 		game.player.object.traverse(function(child) {
            // 				if (child.isSkinnedMesh) {
            // 					// dancingShader = true;
            // 					// child.material = game.greenMaterial;
            // 					game.shroomPsyMaterial4.matcap = game.materials[game.player.shaderIndex].matcap;
            // 					// game.shroomPsyMaterial4.bumpScale = 0.0;

            // 					child.material = game.shroomPsyMaterial4;

            // 					console.log("psy shader on local player");
            // 					setTimeout(function() {
            // 						console.log("psy shader off local player");
            // 						//console.log(game.player.mixer.name);

            // 								// if (game.player.mixer.name !== "Dancing Twerk" | object2.parent.children[0].mixer.name == "Dancing Twerk"){
            // 									// console.log(game.player.mixer.name);
            // 									var previousMaterial = game.materials[game.player.shaderIndex];
            // 									child.material = previousMaterial;

            // 								// }
            // 						dancingShader = false;
            // 					}, 2800);
            // 				}
            // 			});

            // }

            winner = data.winner;
            // console.log('winner data',{data});
            if (data.winner === null) {
                data.winner = "RANDOM ASS PLAYER";
            }
            showWinner(data.winner);


            // scores = data.winners;

            currentScores = data.currentWinners;
            // console.log(scores);

            setTimeout(function () {


                // if (!game.sound3.isPlaying) {
                //     game.sound3.setVolume(0.8);
                //     game.sound3.play();
                //     game.sound3.setVolume(0.8);
                // }
                console.log("stop audio");
                game.sound.stop(game.soundPowerup);
                // game.sound.pause(game.soundPowerup);
                if (!twitchLoaded) {
                    game.sound.play('lickshots');
                }
                console.log('lickshots');
                game.player.points = 0;

            }, 20);
            // game.sound.pause();
            // game.sound2.pause();

            // game.sound.source.stop();
            // game.sound.isPlaying = false;
            // game.sound2.source.stop();
            // game.sound2.isPlaying = false;
            // if (!game.sound.isPlaying){

            // }
            // if (!game.sound2.isPlaying){

            // }

            game.player.points = 0;
            game.player.socket.emit('set points', game.player.points);
            game.player.speechBubble.updatePoints(game.player.points);


            if (!game.player.shroomActivated) { //if your shroom isn't activated then set remote players shroom to false
                console.log('setting remote player shroomActivated to false');
                //  if(game.player.id = data.id) return;
                // shroomDone();
                superShroom = false;

                const remotePlayer = game.getRemotePlayerById(data.id);
                remotePlayer.object.shroomActivated = false;
                remotePlayer.shroomActivated = false;
                // remotePlayer.object.scale.set(0.2, 0.2, 0.2);
                console.log(remotePlayer);
                remotePlayer.object.traverse(function (child) {

                    if (child.isSkinnedMesh) {

                        child.material = game.materials[remotePlayer.shaderIndex];
                        console.log(child.material);

                        // child.material = game.blackMaterial;
                        // child.material.name = "blackMaterial";
                        // child.visible = false;
                        // console.log(child, child.material, game.blackMaterial );
                    }
                });


            } else { // if your shroom is activated execute shroom done
                // console.log('your shroom is activated execute shroom done');
                shroomDone();
                game.player.shroomActivated = false;

            }

        });

        socket.on('setYoutubeMode', function (data) {
            console.log("setting youtube mode", data);

            //console.log(videoId,data.youtubeId);
            if (kicked) return;

            // if (data.youtubeMode) {

            var isPlaylist = data.youtubeId.startsWith("PLT");
            if (videoId !== data.youtubeId) {
                if (youtubePlayer != undefined) {
                    videoId = data.youtubeId;
                    //youtubePlayer.videoId = data.youtubeId;

                    if (!isPlaylist) { //
                        console.log('loading video by id');
                        youtubePlayer.loadVideoById(data.youtubeId);

                    } else {
                        //console.log('loading playlist');
                        youtubePlayer.loadPlaylist({
                            listType: 'playlist',
                            list: data.youtubeId,
                            suggestedQuality: 'highdef',
                            modestbranding: 'true',
                            controls: '0',
                            cc_load_policy: 3,
                            fs: 0,
                            loop: 1,
                            playsinline: 1,
                            showinfo: 0,
                            rel: 0,
                            disablekb: 1,
                            ecver: 2,
                        });
                    }
                    //console.log('changing videos');
                }
            }
            videoId = data.youtubeId;


            setTimeout(function () {

                switchAudioModes("yt");

                game.sound.volume(0.15);
                game.colliders.pop(game.boothCollider);

                //   game.booth.visible = false;
                //   game.cdj1.visible = false;
                //   game.cdj2.visible = false;
                //   game.djm.visible = false;
                //   game.volume.visible = false;

                game.booth.material.transparent = true;
                game.booth.material.opacity = 0.6;

                // console.log(game.cdj1);
                // game.djmMaterial.visible = false;
                // game.scene.remove();
                // console.log(game.djEquipment);
                // game.djEquipment.position.y = 100;



            }, 2000);

            //} 



            // if (youtubeMode !== data.youtubeMode){

            // }

        }
        );

        socket.on('setTwitchMode', function (data) {
            switchAudioModes("twitch");
            twitchId = data.twitchId;
            console.log(twitchId);
            if (enginesStarted) {
                twitch(twitchId);
            }
        });

        socket.on('setffplayerMode', function (data) {
            {
                switchAudioModes("audio");

                game.sound.volume(0.35);
                if (game.colliders !== undefined) {
                    game.colliders.push(game.boothCollider);
                };

                if (game.booth !== undefined) game.booth.visible = true;
                // if (game.stage.material !== undefined) game.stage.material.visible = true;
                if (game.cdj1 !== undefined) game.cdj1.visible = true;
                if (game.cdj2 !== undefined) game.cdj2.visible = true;
                if (game.djm !== undefined) game.djm.visible = true;
                if (game.volume !== undefined) game.volume.visible = true;
            }
        });

        socket.on('globalSongIndex', function (data) {
            globalSongIndex = data.globalSongIndex;
            songIndex = data.globalSongIndex;

            if (!youtubeMode) {
                ffplayer.currentPlaylistIndex = data.globalSongIndex;
            }

            if (player.id == data.id) { } else {
                if (ffplayer.song.getState() == "playing") {

                }
            }

        });


        socket.on('chat message', function (data) {
            //ON socket.io receiving message
            //IF you sent the message then nothing
            //ELSE (message from remote player) put it in the chatlog & update the speech bubble with the message
            if (player.id == data.id) {
                // console.log('you sent a message', data.name);
            } else {
                $("<span style='font-size:24px; font-weight: bold; color:white' class='stretchDown'>" + data.name + "</span><a style='font-weight: normal'>" + " : " + data.message + "</a><br>").delay(3000).fadeOut(5000).prependTo('#chatlog');
                const remotePlayer = game.getRemotePlayerById(data.id);

                remotePlayer.speechBubble.update(data.message);
                remotePlayer.speechBubble.updateName(data.name);
                remotePlayer.speechBubble.mesh.material.opacity = 1.0;

            }

        });
        $('#messageInput').focus(function () {
            selected = true;
        });
        $('#messageInput').blur(function () {
            selected = false;
        });
        $('#nameInput').focus(function () {
            selected = true;
        });
        $('#nameInput').blur(function () {
            selected = false;
        });
        $('#msg-form').submit(function (e) {
            socket.emit('chat message', { name: username, id: game.chatSocketId, message: $('#messageInput').val() });
            console.log("you sent message", username, $('#messageInput').val());
            $("<span style='font-size:24px; font-weight: bold; color:white' class='stretchDown'>" + username + "</span><a style='font-weight: normal'>" + " : " + $('#messageInput').val() + "</a><br>").delay(3000).fadeOut(5000).prependTo('#chatlog'); //cum bk

            player.speechBubble.mesh.material.opacity = 1.0;
            player.speechBubble.update($('#messageInput').val());

            $('#messageInputbutton').css("display", "none");
            $('#messageInput').val('');
            $("#messageInput").blur();
            document.activeElement.blur();
            selected = false;
            $("#messageInput").blur();
            game.playerControl(0, 0);
            fwd = 0;

            return false;

        });

        this.socket = socket;

    }



    initSocket() {
        this.socket.emit('init', {
            x: this.object.position.x,
            y: this.object.position.y,
            z: this.object.position.z,
            h: this.object.rotation.y, //heading
            pb: this.object.rotation.x
        });
        if (username != undefined && this.socket.connected) {
            console.log('setting name before init', this);
            this.socket.emit('set username', username);
        }

        var disconnected = false;

        var idleTime = 0;
        $(document).ready(function () {
            //Increment the idle time counter every minute.
            var idleInterval = setInterval(timerIncrement, 60000); // 10 minute
            // var idleInterval = setInterval(timerIncrement, 6000000);
            //Zero the idle timer on mouse movement.
            $(this).mousemove(function (e) {
                idleTime = 0;
            });
            $(this).keydown(function (e) {
                idleTime = 0;
            });
        });


        function timerIncrement() {

            idleTime = idleTime + 1;
            //	console.log("elapsed minutes since user interaction : " + idleTime);

            if (idleTime >= 30 && !disconnected) { // idle time > how many minutes? 
                //window.location.reload();
                console.log('disconnected');
                disconnectPlayer("DISCONNECTED DUE TO INACTIVITY")
            }
        }
        var self = this;
        disconnectPlayer = function (message) {
            console.log('disconnecting..');
            self.socket.disconnect();
            disconnected = true;

            $("#songlog").empty();
            $("#songlog").stop(false, true);
            $("#songlog").append("<h>" + message + "</h><br>");
            $("#songlog").show();

            $("#songlog").scrollTop($("#songlog")[0].scrollHeight); //cum


            $("#webgl").css("display", "none");
            // $("#css").hide();
            $("#css").css("display", "none");
            if (ffplayer != undefined) {
                ffplayer.stop();
            }
            if (youtubeMode) {
                youtubePlayer.stopVideo();
                youtubePlayer.destroy();
            }
        };
        pwn = function (client) {
            console.log("kicking" + " " + client);

            if (client === game.player.id) {
                console.log("kicking yourself is dumb");
            } else {
                //socket = io.connect();
                self.socket.emit('kick', client);
            }

        };

        yt = function (id) {
            //	console.log("setting youtube to " + audioMode );
            self.socket.emit('youtubeMode', id);
        };

        ff = function () {
            //	console.log("setting youtube to " + audioMode );
            self.socket.emit('ffplayerMode');
        };

        tw = function (id) {
            //	console.log("setting youtube to " + audioMode );
            self.socket.emit('twitchMode', id);
        };



    }

    updateSocket() {
        // var now = Date.now(); 
        num += 1;
        // console.log("updateSocket",num);
        if (this.socket !== undefined) {
            if (this.object === undefined) return;
            window.packet.push({
                x: Math.round(this.object.position.x * 100) / 100,
                y: Math.round(this.object.position.y * 100) / 100,
                z: Math.round(this.object.position.z * 100) / 100,
                h: Math.round(this.object.rotation.y * 100) / 100,
                pb: Math.round(this.object.rotation.x * 100) / 100,
                a: actionIndex
            })
            this.socket.emit('update', {
                x: Math.round(this.object.position.x * 100) / 100,
                y: Math.round(this.object.position.y * 100) / 100,
                z: Math.round(this.object.position.z * 100) / 100,
                h: Math.round(this.object.rotation.y * 100) / 100,
                pb: Math.round(this.object.rotation.x * 100) / 100,
                a: actionIndex
            })
        }

    }

    move(dt) {

        if (walkInCircle) {
            turn = 1;
            fwd = 1;
        }
        const pos = this.object.position.clone();
        pos.y += 10;
        let dir = new THREE.Vector3();
        this.object.getWorldDirection(dir);
        // console.log(this);
        if (this.motion !== undefined) {
            if (this.motion.forward < 0.0) dir.negate();
        }
        let raycaster = new THREE.Raycaster(pos, dir);
        let blocked = false;
        const colliders = this.game.colliders;
        const playerColliders = this.game.playerColliders;

        if (colliders !== undefined) {
            const intersect = raycaster.intersectObjects(colliders);
            if (intersect.length > 0) {
                if (intersect[0].distance < 10) blocked = true;
            }
        }

        // var startime = Date.now();
        // console.clear();
        //Raycaster intersects players, might be cheaper than check collision
        // if (playerColliders!==undefined){

        // 	const intersect = raycaster.intersectObjects(playerColliders);
        // 	if (intersect.length>0){
        // 		if (intersect[0].distance<10) console.log(intersect[0].object.parent);
        // 	}

        // }




        if (colliders !== undefined) {
            //cast left
            dir.set(-1, 0, 0);
            dir.applyMatrix4(this.object.matrix);
            dir.normalize();
            raycaster = new THREE.Raycaster(pos, dir);

            let intersect = raycaster.intersectObjects(colliders);
            if (intersect.length > 0) {
                if (intersect[0].distance < 5) this.object.translateX(1 - intersect[0].distance);
            }

            //cast right
            dir.set(1, 0, 0);
            dir.applyMatrix4(this.object.matrix);
            dir.normalize();
            raycaster = new THREE.Raycaster(pos, dir);

            intersect = raycaster.intersectObjects(colliders);
            if (intersect.length > 0) {
                if (intersect[0].distance < 5) this.object.translateX(intersect[0].distance - 1);
            }

            //cast down
            dir.set(0, -1, 0);
            pos.y += 15;
            raycaster = new THREE.Raycaster(pos, dir);
            const gravity = 450.0 * dt;
            // Always apply gravity
            if (this.velocityY == undefined) this.velocityY = 0;
            this.velocityY -= gravity;
            this.object.position.y += this.velocityY * dt;

            //   console.log("test");
            intersect = raycaster.intersectObjects(colliders);
            //SIMPLIFIED GRAVITY
            if (intersect.length > 0) {
                const targetY = pos.y - intersect[0].distance;

                //   //APPLY GRAVITY TO FALL
                //   if (this.velocityY == undefined) this.velocityY = 0;
                //   this.velocityY -= gravity;
                //   this.object.position.y += this.velocityY * dt;


                if (this.object.position.y < targetY) {
                    //Hit the floor
                    this.velocityY = 0;
                    this.object.position.y = targetY;
                    game.player.isJumping = false;

                    if (!isMobile) {
                        //when you land hit the ground running
                        game.playerControl(fwd, turn);
                    } else {
                        // game.playerControl(0,0);
                    }

                }
            }



            if (!blocked && this.motion != undefined) {

                // console.log(this.motion.forward);
                if (this.motion.forward > 0.0) {
                    const speed = (this.action == anims[1]) ? 100 : 100; //Running
                    if (superShroom) {
                        this.object.translateZ(dt * speed * 1.6);
                    } else {
                        this.object.translateZ(dt * speed);
                    }


                } else if (this.motion.forward < 0.0) {
                    this.object.translateZ(-dt * 30);
                } else {
                    this.object.translateZ(0);
                    // this.action = "Dancing Twerk";
                }
            }


        }
        // this.object.rotateY(this.motion.turn*dt*4);

        if (this.motion != undefined) {

            if (useMouseHeading) {
                this.object.translateX(this.motion.turn * dt * 40);


                this.object.rotation.y = -game.rotation;
                // this.object.rotateY( -game.rotation*0.1);
                // console.log(this.object.rotation.y);
                // this.object.rotateY(-game.rotation);
            } else {
                // console.log("rotate",this.motion.turn)

                if (!isMobile) {
                    let lerpedTurn = lerp(previousTurn, this.motion.turn, 0.3);
                    this.object.rotateY(lerpedTurn * dt * 3);
                    previousTurn = lerpedTurn;
                } else {
                    this.object.rotateY(this.motion.turn * dt * 3);
                }

                // console.log(this.object.rotation.y);


            }

        }

    }
}

var previousTurn = 0;

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

var updateSocket = setInterval(function () {


    // console.log(moving);
    if (moving) {
        // console.log(moving);
        game.player.updateSocket();
    }

    if (dancingcheck | superShroom) {
        //oconsole.log('checkCollisionShroomAndDancing');
        for (var i = 0; i < game.remoteColliders.length; i++) {
            game.detectCollisionCubes(game.player.collider, game.remoteColliders[i]);

        }
    }

    if (game.player.isJumping) {
        //console.log('checkCollisionJumping');
        game.detectCollisionCubes(game.player.collider, game.shroom.scene.children[0]);
        game.detectCollisionCubes(game.player.collider, game.acidMesh);
        game.detectCollisionCubes(game.player.collider, game.dubplateMesh);
        game.detectCollisionCubes(game.player.collider, game.dubplateMesh2);
        game.detectCollisionCubes(game.player.collider, game.dubplateMesh3);
    }
}, 40);

// function handlejump() {

// 		console.log("handlejump");
// 		if (isMobile){
// 			fwd =1;
// 			game.playerControl(fwd,turn);
// 		}


// 		var jumpUp = setTimeout(function(){ 

// 			if (isMobile){
// 				fwd =0;
// 				game.playerControl(fwd,turn,jump)
// 			}

// 		} , 800);

// 		 game.player.isJumping = true;
// }


function jumpUp() {
    const dt = game.clock.getDelta();
    if (!game.player.isJumping && canJump) {
        var jumpForce = 140;

        if (game.player.shroomActivated) {
            jumpForce = 160;
        }
        game.player.isJumping = true;
        canJump = false;

        game.player.object.position.y += 1;
        game.player.velocityY = jumpForce;
        // console.log(game.player.velocityY);
    }

    if (isMobile) {
        fwd = 1;
        game.playerControl(fwd, 0);
        var jumpUp = setTimeout(function () {

            // if (isMobile){
            fwd = 0;
            game.playerControl(fwd, 0)
            // }

        }, 800);
    }



}

function onTransitionStart(event) {

}

function onTransitionEnd(event) {


    event.target.remove();

    if (kicked) {
        disconnectPlayer('RAVE IS AT MAX CAPACITY');
    } else {

        if (youtubeMode) {
            if (!youtubeApiLoaded) {
                console.log('loading youtube api from start');
                loadYouTubeApi();

            }
            //changeLooks = setInterval(nextLook, 10000);

            setLook(0);
        }

    }
    //GET NAMES
    game.player.socket.emit("get names");
    game.player.socket.emit("get shaders", game.player.shaderIndex);
    var lineId = "line" + game.player.shaderIndex;
    // console.log(lineId);
    document.getElementById(lineId).checked = true;



    // console.log("get shaders",game.player.shaderIndex);
    // setTimeout(function(){ 
    // 		game.player.action = animsLookup[0];//idle	
    // 	}, 10000);
    window.addEventListener('mousedown', (event) => game.onMouseDown(event), false);
    window.addEventListener('mouseup', (event) => game.onMouseUp(event), false);

    getJsonFiles();


}

// requestAnimationFrame(watcher);

// function watcher(time){

// 	if(time<nextTime){return;}
// 	nextTime=time+delay;

// 	if (game.player.isJumping){

// 		game.detectCollisionCubes(game.player.collider, game.shroom.scene.children[0]);
// 	}

// 	if(mousedown){
// 		for (var i = 0; i < game.remoteColliders.length; i ++)
// 			{       
// 				game.detectCollisionCubes(game.player.collider, game.remoteColliders[i]);
// 			}
// 	}
// }





// FFPLAYER CODE

function updateAudioAnalysis() {

    analyser.getByteFrequencyData(freqByteData);

    var length = freqByteData.length;

    // normalize levelsData from freqByteData

    for (var i = 0; i < levelsCount; i++) {

        var sum = 0;

        for (var j = 0; j < levelBins; j++) {

            sum += freqByteData[(i * levelBins) + j];

        }

        levelsData[i] = sum / levelBins / 256; // freqData maxs at 256

        // adjust for the fact that lower levels are perceived more quietly
        // make lower levels smaller

        levelsData[i] *= 1 + (i / levelsCount) / 2;

    }

}

function initPlayButton() {
    // buttonElement.addEventListener("click", function() {
    //     console.log('click button');
    //     hideButton();
    //     if (isMobile) {
    //         showTitle("SWIPE UP TO JUMP, TOUCH & HOLD TO DANCE");
    //     } else {
    //         showTitle("SPACE TO JUMP, CLICK TO DANCE");
    //     }
    // }, false);
    // console.log('initPlayButton');

}

function hideButton() {

    if (playButtonVisible) {

        buttonElement.style.display = "none";
        // buttonOverlayElement.style.display = "none";
        buttonElement.remove();
        buttonOverlayElement.remove();
        playButtonVisible = false;
        console.log('hiding button');

        // document.getElementById("play_overlay").classList.add('hidden');
    }

}
var interval = 0;

function apiNotFound() {
    console.log('API NOT LOADED');

    reloadApi = setTimeout(function () {
        console.log('reloading api');

        if (interval < 2) {
            loadYouTubeApi();
            interval++;
        } else {
            showTitle('Video Stream API Not Loaded');
            console.log('Video Stream API Not Loaded');
            switchAudioModes("yt");
        }
    }, 1000);

}

function loadYouTubeApi() {
    console.log("loading video api");

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onerror = apiNotFound;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    // var tag2 = document.createElement('script');
    // tag2.src = "https://www.youtube.com/iframe_api";
    // tag2.onerror = apiNotFound;
    // var firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(tag2, firstScriptTag);

    // setTimeout(function(){ 

    // 	youtubeApiLoaded = true;

    // }, 1000);



}

function onPlayerReady(event) {
    console.log('player is readdy');
    $("iframe").css("width", "480px");
    $("iframe").css("height", "360px");
    $("iframe").attr("id", "YOUTUBE");
    $("iframe").css("display", "block");
    //youtubeDiv.appendChild(YOUTUBE);
    youtubeApiLoaded = true;
    var isPlaylist = videoId.startsWith("PLT");
    if (isPlaylist) {
        console.log('loading playlist');
        youtubePlayer.loadPlaylist({
            listType: 'playlist',
            list: videoId,
            suggestedQuality: 'highdef',
            modestbranding: 'true',
            controls: '0',
            cc_load_policy: 3,
            fs: 0,
            loop: 1,
            playsinline: 1,
            showinfo: 0,
            rel: 0,
            disablekb: 1,
            ecver: 2,
        });
    } else {
        youtubePlayer.loadVideoById(videoId);
        console.log('loading video by video id');
    }

    event.target.playVideo();

    var lastTime = -1;
    var interval = 1000;

    // //GET YOUTUBE TIME EVERY SECOND
    // var checkPlayerTime = function () {


    // 	if (lastTime != -1) {
    // 		if(youtubePlayer.getPlayerState() == YT.PlayerState.PLAYING ) {
    // 			var t = youtubePlayer.getCurrentTime();

    // 			//console.log(Math.abs(t - lastTime -1));

    // 			///expecting 1 second interval , with 500 ms margin
    // 			if (Math.abs(t - lastTime - 1) > 0.5) {
    // 				// there was a seek occuring
    // 				console.log("seek"); /// fire your event here !
    // 			}

    // 			//Strobe every one second
    // 			if(!strobe){
    // 				strobe = true;
    // 			}else{
    // 				strobe = false;
    // 			}

    // 		}
    // 	}
    // 	lastTime = youtubePlayer.getCurrentTime();
    // 	setTimeout(checkPlayerTime, interval); /// repeat function call in 1 second
    // }

    // setTimeout(checkPlayerTime, interval); /// initial call delayed 

}
var done = false;
var playerState;


function onPlayerStateChange(event) {

    playerState = event.data;
    console.log(playerState);
    if (playerState === 1) { //playing
        $("#css").css("z-index", 0);
        game.screen.visible = true;
        game.cssobject.visible = false;
        game.webglrepresentation.visible = false;


        if (isChrome && isIframe) {
            $("iframe").css("width", "480px");
            $("iframe").css("height", "360px");
            $("iframe").css("opacity", "1");
            $("iframe").parent().css("transform style", "preserve-3d");
        }

        displayYoutube = setTimeout(function () {
            $("#css").css("display", "block");
            $("#youtubeDiv").width(0).height(0);
            $("iframe").css("display", "block");
            $("#YOUTUBE").css("display", "block");

            game.screen.visible = false;
            game.cssobject.visible = true;
            game.webglrepresentation.visible = true;

            console.log('SHOW SCREEN');
            //console.log(game.videodiv);
        }, 6000);

        youtubeIsPlaying = true;
        console.log('youtubeIsPlaying')
    }

    if (playerState === 3) { //loading
        //   $("iframe").css("display", "block");
        $("iframe").css("display", "none");
        $("#css").css("z-index", 0);
        $("#css").css("display", "none");
        $("#YOUTUBE").css("display", "none");

        game.screen.visible = true;
        game.cssobject.visible = false;
        game.webglrepresentation.visible = false;

        youtubeIsPlaying = true;
        console.log('youtubeIsLoading');
    }

    if (playerState === -1) { //paused 
        // $("#css").css("display", "none");
        $("iframe").css("display", "block");
        //   $("#css").css("display", "block");
        $("#css").css("display", "none");



        if (isChrome && isIframe) {
            $("#css").css("z-index", 1000);
            $("#youtubeDiv").width(0).height(0);

            $("iframe").css("width", "30px");
            $("iframe").css("height", "30px");
            $("iframe").css("border-radius", "5px");


            game.cssobject.visible = true;
            game.webglrepresentation.visible = true;
            game.cssobject.rotation = 0;
            console.log('chrome in iframe');
        } else {
            game.screen.visible = true;
            game.cssobject.visible = false;
            game.webglrepresentation.visible = false;
            $("#YOUTUBE").css("display", "none");
        }
        //TESTING
        // $("#css").css("z-index", 1000);
        // $("#css").css("perspective", "none");
        // $("#css").css("transform", "none");
        // $("#youtubeDiv").width(0).height(0);
        // showTitle('Click Play on Youtube');
        // game.cssobject.visible = true;
        // game.webglrepresentation.visible = true;
        // console.log('chrome in iframe');

        game.screen.visible = true;
        game.cssobject.visible = true; //alan test
        youtubeIsPlaying = false;


        console.log('youtubeIsPaused');
        enginesStarted = false;

    }
    if (playerState === 0 || playerState === 2 || playerState === 5) { //unstarted | ended  | buffering | cued
        // $("#css").css("display", "none");
        console.log('youtubeIsBufferingOrEnded');
        $("iframe").css("display", "block");
        $("#css").css("display", "block");
        $("#css").css("z-index", 0);
        $("#css").css("display", "none");
        $("#YOUTUBE").css("display", "none");

        game.screen.visible = true;
        youtubeIsPlaying = false;
        game.cssobject.visible = false;
        game.webglrepresentation.visible = false;
        console.log("cssobject not visible, not webglrepresetaion visible");

    }
    // console.log({yo});
}

function stopVideo() {
    youtubePlayer.stopVideo();
    $("#YOUTUBE").css("display", "none");
}
var twitchId;
function twitch(value) {
    console.log("twitch();");
    game.webglrepresentation2.visible = true;
    game.cssobject2.visible = true;
    game.webglrepresentation2.visible = true;
    game.cssobject2.visible = true;
    $("#css").css("display", "block");
    // $("#youtubeDiv").width(0).height(0);
    $("iframe").css("display", "block");
    if (youtubeApiLoaded) {
        console.log('youtube display none');
        $("#YOUTUBE").css("display", "none");
        document.getElementById("YOUTUBE").style.display = "none";
        //  $("#YOUTUBE").css("z-index", "100");
    }

    twitchMode = true;

    var twitchChannel = value;

    ffplayer.stop();
    game.sound.volume(0.1);
    light2Intensity = .3, light1Intensity = .4;
    if (game.booth !== undefined) {
        game.booth.material.transparent = true;
        game.booth.material.opacity = 0.6;
    }
    $("#css").css("display", "block");


    if (!twitchLoaded) {

        console.log("twitch loading");
        var options = {
            height: "360",
            width: "480",
            channel: twitchChannel,
            allowfullscreen: false,
            layout: 'video',
            controls: false,
            muted: true,
            parent: ["club.fractalfantasy.net", "www.club.fractalfantasy.net", "www.fractalfantasy.net", "fractalfantasy.net"]
        };

        if (!isMobile) {
            options.muted = false;
            options.volume = 1;
        }

        twitchPlayer = new Twitch.Embed("twitchDiv", options);

        document.getElementById('unmute').addEventListener('click', (e) => {
            console.log('Attempt UnMute');
            twitchPlayer.setMuted(false);
            $("#unmute").css("display", "none");
        });

        twitchPlayer.addEventListener(Twitch.Player.PLAYBACK_BLOCKED, function () {
            console.log('Twitch Playback blocked');
        })

        twitchPlayer.addEventListener(Twitch.Player.READY, function () {
            console.log('Twitch Player Ready');
        })
        twitchPlayer.addEventListener(Twitch.Player.SEEK, function () {
            console.log('Twitch Player seek');
        })

        twitchPlayer.addEventListener(Twitch.Player.ONLINE, function () {
            console.log('Twitch Player online');
        })

        twitchPlayer.addEventListener(Twitch.Player.OFFLINE, function () {
            console.log('Twitch Player offline');
        })

        twitchPlayer.addEventListener(Twitch.Player.PLAYBACK_BLOCKED, function () {
            console.log('Twitch Player Blocked');
        })
        twitchPlayer.addEventListener(Twitch.Player.PLAYING, function () {
            console.log('Twitch Playback Playing');
        })



        twitchPlayer.addEventListener(Twitch.Embed.VIDEO_READY, function () {
            console.log('The video is ready');
            twitchApiReady = true;
        })

        twitchPlayer.addEventListener(Twitch.Embed.VIDEO_PLAY, function () {
            console.log('The video is playing');
            $("#css").css("display", "block");

            //   twitchPlayer.setVolume(1)
            //   if (twitchLoaded && twitchIsPlaying){
            //     // twitchPlayer.setMuted(false);

            //     // console.log("unmute");
            //  }



            twitchIsPlaying = true;
            if (isMobile) {
                $("#unmute").css("display", "block");
                // twitchPlayer.setVolume(1);
            } else {
                twitchPlayer.setVolume(1);
            }
        })

        twitchLoaded = true;

    } else {
        twitchPlayer.setChannel(twitchChannel);
    }



}

function onYouTubeIframeAPIReady() {

    console.log("putting video player in div");

    youtubePlayer = new YT.Player('youtubeDiv', {
        host: 'https://www.youtube.com',

        height: '2160',
        width: '100%',
        // videoId:'DDU-rZs-Ic4', // SPACE STATION
        //videoId:'Ai6Y6z97fKI', //TRIAL
        videoId: videoId, //DREAMROOMS1
        playerVars: {
            autoplay: 1,
            // listType:'playlist',
            // list: 'PLTj-JRNB9VKwFTuJmO2mQVxXlR-QC4Q0h', //VnameInput
            // list: 'PLTj-JRNB9VKxQWhmvXk88BOEnmSd5bH-z',

            // videoId:'DDU-rZs-Ic4',
            //isMuted: 'true',
            suggestedQuality: 'highdef',
            modestbranding: 'true',
            controls: '0',
            cc_load_policy: 3,
            fs: 0,
            loop: 1,
            playsinline: 1,
            showinfo: 0,
            rel: 0,
            disablekb: 1,
            ecver: 2,
            origin: 'https://club.fractalfantasy.net',
        },
        events: {
            'onReady': onPlayerReady,

            'onStateChange': onPlayerStateChange,
        }

    });
    console.log("finished putting video player in div");
    //console.log({youtubePlayer});  
}

function hideButton() {

    if (playButtonVisible) {

        buttonElement.style.display = "none";
        playButtonVisible = false;
        console.log('hiding button');

        // document.getElementById("play_overlay").classList.add('hidden');
    }

}

function initPlayer() {

    ffplayerLoaded = true;

    if (useSoundCloudPlayer) {

        ffplayer = new FFPlayer({
            title: '',
            description: "",
            artist: "",

            mode: 'sc playlist',
            src: '567843948',

            autoPlay: false,
            embedCode: "",
            downloadLink: '',
            link: true,
            embed: false,
            download: false,
            volume: true,

            imgRoot: 'ffplayer/img/',
            loop: true

        });

    } else {

        ffplayer = new FFPlayer({
            title: 'F F C L U B ',
            description: "Visual/Code: Sinjin Hawke",
            artist: "Fractal Fantasy",

            mode: 'audio playlist',
            src: [
                "https://cdn.fractalfantasy.net/club-sim-mp3/YBN Almighty Jay - 2 Tone Drip (Zora Jones & Sinjin Hawke Bootlegs).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Cosha TG - Call My Phone (Xzavier Stone Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Dj Pierre - Time It Takes (Zora Jones Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Dom Kennedy - My Type Of party (Zora Jones Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Busy Signal - Brave & Bold (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Beek - Blow Ya Smoke (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Busta - We Gonna Do It (Zubotnik Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Beatking - Throw That Ahh & Uncle Luke (Sinjin Hawke Refix).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Ciara - Go Girl (Zora Jones Edit).mp3",
                // "https://cdn.fractalfantasy.net/club-sim-mp3/Cuppcake - Blackjack (Zora Jones Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Divoli S'vere - Free Bitch (Sinjin Hawke Remix).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Eric Bellinger - Bedroom Love (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/FKA Twigs - In Time (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Lady Saw - Last Night (Sinjin Hawke Refix).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Masters At Work - Work (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Mc Money & Gangsta Gold - Glock Tight Smoked Out (Xzavier Stone Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Missy Elliot - Tempo (Sinjin Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Playboi Carti - R.I.P. Fredo (Notice Me) (Xzavier Stone Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Playboy Carti - Kid Cudi (Sinjin Hawke Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Sinjin Hawke - Dont Lose Yourself To This (Zubotnik Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Sinjin Hawke, Pink Dollaz & L-Vis 1990 - Cake (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Sittin In My Room - Brandy (Sinjin Hawke & Xzavier Stone Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Sophia Akkara - Teri Meri (Zora Jones Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Spaceghostpurrp - No Mid (Zora Jones Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Syringe - I Don't Like U (Sinjin Hawke & Zora Jones Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/T-Pain - Booty Butt Ass (Zora Jones Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Teenear - Streetlights (Zubotnik Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Beatking - 321 (Sinjin Hawke Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Tiara Goonie - All Out Of Time (Zora Jones Bootleg).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Tyga & Megan Thee Stallion - Freak (Sinjin SH101 Refix).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Lil B - Dreams (Sinjin Hawke & Zora Jones Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Barrington Levy - She Give Me Love (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Masters At Work - Work (Bootyspoon Club Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Bambounou - Any Other Service (Zora Jones Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Camron ft Juelz Santana - Oh Yeah (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Ski Mask The Slump God x Wiley - Fire Hydrant (FF Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Trina - Fuck Love (Sinjin Hawke Edit).mp3",
                "https://cdn.fractalfantasy.net/club-sim-mp3/Xza x SouljaBoy - Steamy Boy Swag (Martyn Bootyspoon Edit).mp3",
            ],

            songTitle: [
                "YBN Almighty Jay - 2 Tone Drip (Zora & Sinjin Bootleg)",
                "Cosha TG - Call My Phone (Xzavier Stone Bootleg)",
                "Dj Pierre - Time It Takes (Zora Jones Bootleg)",
                "Dom Kennedy - My Type Of party (Zora Jones Edit)",
                "Busy Signal - Brave & Bold (Sinjin Hawke Edit)",
                "Beek - Blow Ya Smoke (Sinjin Hawke Edit)",
                "Busta - We Gonna Do It (Zubotnik Edit)",
                "Beatking - Throw That Ahh & Uncle Luke (Sinjin Hawke Refix)",
                "Ciara - Go Girl (Zora Jones Edit)",
                // "Cuppcake - Blackjack (Zora Jones Edit)",
                "Divoli S'vere - Free Bitch (Sinjin Hawke Remix)",
                "Eric Bellinger - Bedroom Love (Sinjin Hawke Edit)",
                "FKA Twigs - In Time (Sinjin Hawke Edit)",
                "Lady Saw - Last Night (Sinjin Hawke Refix)",
                "Masters At Work - Work (Sinjin Hawke Edit)",
                "Mc Money - Glock Tight Smoked Out (XZA Bootleg)",
                "Missy Elliot - Tempo (Sinjin Edit)",
                "Playboi Carti - R.I.P. Fredo (Xzavier Stone Edit)",
                "Playboy Carti - Kid Cudi (Sinjin Hawke Bootleg)",
                "Sinjin Hawke - Dont Lose Yourself To This (Zubotnik Bootleg)",
                "L-Vis 1990, Sinjin Hawke, Pink Dollaz - Cake (Sinjin Hawke OG Edit)",
                "Sittin In My Room - Brandy (Sinjin & XZA Bootleg)",
                "Sophia Akkara - Teri Meri (Zora Jones Bootleg)",
                "Spaceghostpurrp - No Mid (Zora Jones Bootleg)",
                "Syringe - I Don't Like U (Sinjin Hawke & Zora Jones Bootleg)",
                "T-Pain - Booty Butt Ass (Zora Jones Bootleg)",
                "Teenear - Streetlights (Zubotnik Bootleg)",
                "Beatking - 321 (Sinjin Hawke Bootleg)",
                "Tiara Goonie - All Out Of Time (Zora Jones Bootleg)",
                "Tyga & Megan Thee Stallion - Freak (Sinjin SH101 Refix)",
                "Lil B - Dreams (Sinjin Hawke & Zora Jones Edit)",
                "Barrington Levy - She Give Me Love (Sinjin Hawke Edit)",
                "Masters At Work - Work (Bootyspoon Club Edit)",

                "Bambounou - Any Other Service (Zora Jones Edit)",
                "Camron ft Juelz Santana - Oh Yeah (Sinjin Hawke Edit)",
                "Ski Mask The Slump God x Wiley - Fire Hydrant (FF Edit)",
                "Trina - Fuck Love (Sinjin Hawke Edit)",
                "Xza x SouljaBoy - Steamy Boy Swag (Martyn Bootyspoon Edit)",
            ],

            autoPlay: false,
            embedCode: '',
            downloadLink: 'https://cdn.fractalfantasy.net/FFClubEdits2021.zip',
            embed: false,
            download: true,
            volume: true,
            imgRoot: '../ffplayer/img/',
            audioRoot: '',
            loop: true



        });
    }

    document.getElementById("ffplayer").style.display = "none";
    ffplayer.timeline.style.background = '#333333';

    ffplayer.addCallback("play", playerPlayCallback);
    ffplayer.addCallback("pause", playerPauseCallback);
    ffplayer.addCallback("end", playerPlaylistEndCallback);
    ffplayer.addCallback("skip", playerSkipCallback);
    ffplayer.addCallback("skipback", playerSkipBackCallback);
    ffplayer.addCallback("seek", playerSeekCallback);
    ffplayer.addCallback("scrub", playerScrubCallback);
    ffplayer.addCallback("streamAudio", playerStreamAudioCallback);
    ffplayer.addCallback("autoplayPrevented", playerAutoplayPreventedCallback);

    // if (isChrome && isIframe) {
    //     // initPlayButton();
    // }

    if (useAudioAnalysis) {

        initAudioAnalysis();

        if (!useSoundCloudPlayer) connectAudioAnalysis(ffplayer.song);

    }





    initAudioAnalysis();

    if (!useSoundCloudPlayer) connectAudioAnalysis(ffplayer.song);


}

function playerStreamAudioCallback(index) {
    // console.log(index,"audiocallbackindex")


    var audioElement = useSoundCloudPlayer ? ffplayer.streamAudioElement : ffplayer.song;

    if (useAudioAnalysis) {

        if (currentAudioElement !== audioElement) {

            connectAudioAnalysis(audioElement);

        }

    }

    currentAudioElement = audioElement;

    setActiveSong(index);


}

function playerAutoplayPreventedCallback() {

    console.log("[Xzavier] autoplayPrevented");

    //TEMP

    // playInitialized = false;
    // youtubeInitialized = false;




    if (useAudioAnalysis && audioCtx) audioCtx.resume();

    rotationPaused = true;

    // document.getElementById("yo2").classList.add("hidden");
    // document.getElementById("fadeInElement2").classList.remove("fadeIn");
    // document.getElementById("fadeOutElement2").classList.remove("fadeOut2");

}

function showButton() {
    console.log('showing button')
    buttonElement.style.display = "block";

    //document.getElementById("play_overlay").classList.remove('hidden');
    if (!playButtonVisible) {

        buttonElement.style.display = "block";
        playButtonVisible = true;

    }

}


function playerPlayCallback() {

    // console.log("[Zubotnik] play");

    if (useAudioAnalysis && audioCtx) audioCtx.resume();

    // hideButton();

    // rotationPaused = false;

    // document.getElementById("yo2").classList.remove("hidden");
    // document.getElementById("fadeInElement2").classList.add("fadeIn");
    // document.getElementById("fadeOutElement2").classList.add("fadeOut");

}

function playerPauseCallback() {

    // console.log("[Zubotnik] pause");

    // rotationPaused = true;

}

function playerSeekCallback(t) {

    // console.log("[Zubotnik] seek", t);

    syncBeats();

}

function playerScrubCallback(t) {

    // console.log("[Zubotnik] scrub", t);

    syncBeats();

}

function playerSkipCallback() {
    // var yo = ffplayer.song.getDuration();
    // console.log(yo);


    // if (ffplayer.song.getState() == "seeking"){

    // }


    // ffplayer.song.stop;

    // console.log("[Zubotnik] skip");

    songIndex++;



    if (songIndex > globalSongIndex) {
        if (songIndex > 36) {
            songIndex = 0;
        }
        game.player.socket.emit("songIndex", songIndex);

    }
    showTitle(ffplayer.songTitle[songIndex]);
    //showTitle(ffplayer.songTitle[songIndex]);


    // }, 4);
    //	$("#songlog").fadeOut(4000);

}

function showTitle(title) {
    $("#songlog").empty();
    $("#songlog").stop(false, true);
    $("#songlog").append("<h style='font-size:min(3vw, 18px);'>" + title + "</h><br>");
    $("#songlog").show();
    $("#songlog").delay(2500).fadeOut(5000, 'swing');
    //$("#songlog").scrollTop($("#songlog")[0].scrollHeight);
}

function showWinner(title) {
    $("#gamelog").empty();
    $("#songlog").empty();

    $("#gamelog").stop(false, true);
    //$("#gamelog").append("<br><center><span class='stretch' id='winnerDiv' style='font-size:calc(100% + 1vw); font-weight: bold; line-height: 40%; width:50%'>" + title + "</span><br><span class='stretch strokeme' id='winnerDiv' style='line-height: 100%; font-size:calc(100% + 6vw); font-family:Impact; width:50%'>" + "WINS" + "</span></center>");
    $("#gamelog").append("<br><center><span class='stretch' id='winnerDiv' style='font-size:2vw; font-weight: bold; line-height: 40%; width:50%'>" + title + "</span><br><span class='stretch strokeme' id='winnerDiv' style='line-height: 100%; font-size:clamp(10px, 10vw, 50px);  font-family:Impact,Yo,sans-serif;'>" + "WINS" + "</span></center>");
    //font-size:calc(100% + 6vw); 
    $("#gamelog").show();
    $("#songlog").delay(1600).empty();
    $("#gamelog").delay(2500).fadeOut(500, 'swing');
    // $("#gamelog").delay(109500).fadeOut(500,'swing');
    $.when($("#gamelog").fadeOut(500)).done(function () {
        $("#gamelog").hide();
        showScores();
    });
    $("#gamelog").scrollTop($("#songlog")[0].scrollHeight);
    showingScores = false;

    game.player.points = 0;

}

function youtubePrompt(title) {
    $("#gamelog").empty();
    $("#songlog").empty();

    $("#gamelog").stop(false, true);
    //$("#gamelog").append("<br><center><span class='stretch' id='winnerDiv' style='font-size:calc(100% + 1vw); font-weight: bold; line-height: 40%; width:50%'>" + title + "</span><br><span class='stretch strokeme' id='winnerDiv' style='line-height: 100%; font-size:calc(100% + 6vw); font-family:Impact; width:50%'>" + "WINS" + "</span></center>");
    $("#gamelog").append("<br><br><center><span class='stretch' id='winnerDiv' style='font-size:3vw; font-weight: bold; line-height: 40%; width:50%'>" + title + "</span>");
    //font-size:calc(100% + 6vw); 
    $("#gamelog").show();
    $("#songlog").delay(1600).empty();
    $("#gamelog").delay(2500).fadeOut(500, 'swing');
    // $("#gamelog").delay(109500).fadeOut(500,'swing');
    $.when($("#gamelog").fadeOut(500)).done(function () {
        $("#gamelog").hide();
        // showScores();
    });
    $("#gamelog").scrollTop($("#songlog")[0].scrollHeight);
    showingScores = false;

}
$("#gamelog").click(function () {
    if (!showingScores) {
        showScores();
    } else {
        showWinner(winner);
    }

});


function playerSkipBackCallback() {
    // var yo = ffplayer.song.getDuration();
    // console.log(yo);


    // if (ffplayer.song.getState() == "seeking"){

    // }


    // ffplayer.song.stop;

    // console.log("[Zubotnik] skip");
    songIndex--;

    if (songIndex < 0) {
        songIndex = 36;
    }
    showTitle(ffplayer.songTitle[songIndex]);
    game.player.socket.emit("songIndex", songIndex);

}

function playerPlaylistEndCallback() {
    songIndex = 0;
    game.player.socket.emit("songIndex", songIndex);
    // console.log("[Zubotnik] finished playlist");

}

function setActiveSong(index) {


    currentSongIndex = index;
    // console.log(currentSongIndex,"currentSongIndex")
    currentLookIndex = lookIdToIndex[songLookMap[currentSongIndex]];
    // console.log(songLookMap[currentSongIndex],"songLookMap[currentSongIndex]");
    // console.log(currentLookIndex,"currentLookIndex");

    setLook(currentLookIndex);

    //var numSongs = 32;
    //var nextSongLook = lookIdToIndex[songLookMap[(currentSongIndex + 1) % numSongs]];
    // preloadLook(nextSongLook);

    resetBeats();

}

//-----------------------------------------------------------------------------------------------

function syncBeats() {

    if (audioBeats === undefined) return;
    var song = audioBeats[currentSongIndex];

    var beats = song["beats"];
    var beatIndex = song["beatIndex"];

    var zNumber = currentAudioElement ? currentAudioElement.currentTime : 0.0;
    var zIndex = bounds.lt(beats, zNumber);

    zIndex = Math.max(zIndex, 0);

    song["beatIndex"] = zIndex;

    //console.log(song["beatIndex"]);

}

function resetBeats() {
    if (audioBeats === undefined) return;
    var song = audioBeats[currentSongIndex];

    song["beatIndex"] = 0;

}

//-----------------------------------------------------------------------------------------------

function initAudioAnalysis() {

    // init audio context and analyser node
    // (skip for Explorer which does support WebAudio API)

    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

    if (window.AudioContext && useAudioAnalysis && !analyser) {

        audioCtx = new AudioContext();
        console.log(audioCtx);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.8;

        binCount = analyser.frequencyBinCount; // = 512
        levelBins = Math.floor(binCount / levelsCount); // number of bins in each level

        freqByteData = new Uint8Array(binCount);

        analyser.connect(audioCtx.destination);

    }

}

async function initAudioBeats() {

    // fix wrong tempo from MIDI files

    for (var j = 0, jl = audioBeats.length; j < jl; j++) {

        var song = audioBeats[j];

        var beats = song["beats"];
        var bpm = song["bpm"];

        for (var i = 0, il = beats.length; i < il; i++) {

            var timeStamp = beats[i];
            timeStamp *= 120.0 / bpm;

            beats[i] = timeStamp;

        }

    }

}

function connectAudioAnalysis(audioElement) {

    if (window.AudioContext && useAudioAnalysis && analyser) {

        if (currentAudioSrc) {

            currentAudioSrc.disconnect(analyser);

        }

        var audioSrc = audioCtx.createMediaElementSource(audioElement);
        audioSrc.connect(analyser);

        currentAudioSrc = audioSrc;
        console.log({ currentAudioSrc });
    }

}

function moveBeat() {
    //beatValue ^= true;
    beatValue = !beatValue;

    // if (beatValue = 0){
    //      beatValue = true;
    // } else {
    //      beatValue = false;
    // }
    // console.log(beatValue);


}

function previousLook() {

    currentLookIndex = (currentLookIndex - 1) % lookList.length;
    if (currentLookIndex < 0) currentLookIndex += lookList.length;

    setLook(currentLookIndex);

}

function nextLook() {

    currentLookIndex = (currentLookIndex + 1) % lookList.length;

    setLook(currentLookIndex);

    //console.log("nextlook")

}


function setLook(index) {
    // console.log("look index",index);
    var look = lookList[index];

    // var lookLabel = look[ "label" ];
    // lookElement.innerHTML = lookLabel;

    setLights(look["light1"], look["light2"], look["tube"]);


}

// setLook(currentLookIndex);

function playYoutube() {
    console.log('playYoutube()');
    $("#css").css("display", "none");


    $("iframe").css("width", "480px");
    $("iframe").css("height", "360px");
    $("iframe").attr("id", "YOUTUBE");
    $("iframe").css("display", "block");
    // youtubeDiv.appendChild(YOUTUBE);
    $("iframe").css("pointer-events", "none");

    //	console.log('test', youtubePlayer.playVideo());
    // console.log('playYoutube()');
    if (youtubePlayer !== undefined) {


        console.log('youtubePlayer.playVideo();');
        youtubePlayer.playVideo();

    } else {
        console.log('youtubePlayer is undefined');
        // youtubePlayer is undefined
    }

    // $("div #youtubeDiv").remove();
    // $("div #youtubeDiv").css("background-color", "yellow");



    // $("div #youtubeDiv").css("width", "0px");
    // $("div #youtubeDiv").css("height", "0px");
    // $("div #youtubeDiv").css("background-color", "yellow");
    // $("div #youtubeDiv").css("pointer-events", "none");
    // $("div #youtubeDiv").hide();
    // $("div #youtubeDiv").remove();
    // $("#youtubeDiv").hide();
    // $("#youtubeDiv").remove();
    // var element = document.getElementById('youtubeDiv');
    // console.log(element);


    //syncBeats();
    //youtubePlayer.mute();

    // $("div #youtubeDiv").css("background-color", "yellow");




    // $("iframe").css("background-color", "black");


    // 	console.log('ff logo gone');
    // 	// $("div #youtubeDiv").css("width", "0px");
    // 	// $("div #youtubeDiv").css("height", "0px");
    // 	// 

    // 	// $("iframe").css("width", "480px");
    // 	// $("iframe").css("height", "360px");
    // 	// $("iframe").css("background-color", "black");


    //  videoPlaying = true;

};
//BOOM
// $("#play").on('click', () => { 
// 	console.log("hi");
// 	$("#play").hide();
// 	$("div #videoframe").css("width", "0px");
// 	$("div #videoframe").css("height", "0px");
// 	$("div #videoframe").css("background-color", "yellow");

// 	$("iframe").css("width", "480px");
// 	$("iframe").css("height", "360px");
// 	$("iframe").css("background-color", "black");
// 	player.playVideo();

// });
document.addEventListener("DOMContentLoaded", function () {
    game = new Game();
    game.init();
    setLook(currentLookIndex);
});
