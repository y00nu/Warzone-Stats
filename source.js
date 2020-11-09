const inputBox = document.querySelector('#search');
const button = document.querySelector('#button');
const datas = document.querySelector('.datas');

button.addEventListener('click', getData);
inputBox.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    getData();
  }
});

class Person {
  constructor(kd, kAverage, wRatio, gPlayed) {
    this.킬뎃 = kd;
    this.평균처치 = kAverage;
    this.승률 = wRatio;
    this.매치 = gPlayed;
  }
}

function splitNameAndTag(n) {
  let name;
  let tag;
  for (let i = 0; i < n.length; i++) {
    if (n[i] === '#') {
      name = n.slice(0, i);
      tag = n.slice(i + 1, n.length);
      break;
    }
  }
  return [name, tag];
}

function getStats(name, tag) {
  fetch(
    `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${name}%2523${tag}/acti`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com',
        'x-rapidapi-key': '0505614376msh19c8d8697707eadp1eb01ajsnd911b4961028',
      },
    }
  )
    .then(res => res.json())
    .then(data => {
      const warzone = data.br;
      const gamesPlayed = warzone.gamesPlayed;
      const averageKill = (warzone.kills / warzone.gamesPlayed).toFixed(1);
      const kdRatio = warzone.kdRatio.toFixed(2);
      const winRatio = ((warzone.wins / warzone.gamesPlayed) * 100).toFixed(1);
      const person = new Person(kdRatio, averageKill, winRatio, gamesPlayed);
      datas.innerHTML = `<li>${name}</li>`;
      for (const key in person) {
        addNewElement(key, person[key]);
      }
    });
}

function getData() {
  datas.innerHTML = '';
  let nickName = '';
  nickName = inputBox.value;
  inputBox.value = '';
  splitedName = splitNameAndTag(nickName);
  getStats(splitedName[0], splitedName[1]);
  datas.classList.add('clicked');
}

function addNewElement(name, value) {
  const data = document.createElement('li');
  data.innerHTML = `<span>${name}</span><span class = "red">${value}</span>`;
  datas.appendChild(data);
}
