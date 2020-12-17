# Javascript Game
## 상세설명
제한된 시간 내에 당근을 모두 없애는 게임입니다.<br/>
벌레를 클릭할 경우, 타임아웃이 되었을 경우 게임에서 지게 됩니다

### 1. Result
  <img width="800" alt="filtered" src="https://user-images.githubusercontent.com/71836751/102324866-c455da00-3fc5-11eb-8f06-499e1d496f84.jpg">


### 2. 사용언어
* HTML
* CSS
* Javascript

## 주요기능
- [x] Play button 클릭 시 게임 시작(당근, 벌레, 카운트, 타이머 창 등장) 및 타이머 동작
- [x] 당근을 클릭할시 count의 개수가 줄어들고 count가 0 이 되면 win popup이 뜸
- [x] 벌레를 클릭 시 game이 stop되고 lose popup이 뜸
- [x] 게임 동작 중(started = true일 때) 정지버튼을 누르면 replay popup이 뜨고 게임을 재실행 할 수 있음

## 구현과정
1. Math.random API를 이용하여 randomNumber를 호출하는 함수를 만든 뒤 init Game에서 당근과 벌레 이미지를 translate을 이용하여 정해진 갯수만큼 field내에 random한 위치에 뿌림
2. setInterval을 이용해 startGameTimer함수를 생성하고 게임에서 지거나 게임이 정지될 때 clearInterval로 타이머를 제어함
3. playGame과 stopGame함수를 만들고 started를 boolean으로 지정해서 게임이 동작하고 있는지 아닌지 여부에 따라 게임을 제어함
4. field를 클릭할 때 당근과 벌레에 반응하는 이벤트 핸들러를 만들어주고 게임이 동작되지 않을때(started = false일 때)는 빠르게 return해주어 이벤트가 호출되지 않게 한다
