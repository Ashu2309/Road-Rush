 const score = document.querySelector(".score");
        const start_screen = document.querySelector(".start_screen");
        const gamearea = document.querySelector(".gamearea");

        // console.log(gamearea);

        start_screen.addEventListener('click', start);

        let player = { carspeed: 9, speed: 5, score: 0 };

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false }

        function keyDown(e) {
            e.preventDefault();
            keys[e.key] = true;
            // console.log(e.key);
            // console.log(keys);
        }

        function keyUp(e) {
            keys[e.key] = false;
            e.preventDefault();
            // console.log(e.key);
            // console.log(keys);
        }



        function start() {
            // gamearea.classList.remove('hide');
            start_screen.classList.add('hide');
            gamearea.innerHTML = "";

            player.start = true;
            player.score = 0;
            window.requestAnimationFrame(gamePlay);

            for (var i = 0; i < 5; i++) {
                let roadline = document.createElement('div');
                roadline.setAttribute('class', 'lines');
                roadline.j = (i * 150);
                roadline.style.top = (i * 150) + "px";
                gamearea.appendChild(roadline);
            }



            let car = document.createElement('div');
            car.setAttribute('class', 'car');
            // car.innerText = "car";
            gamearea.appendChild(car);

            player.x = car.offsetLeft;
            player.y = car.offsetTop;

            for (var i = 0; i < 3; i++) {
                let enemyCar = document.createElement('div');
                enemyCar.setAttribute('class', 'enemy');
                enemyCar.j = ((i + 1) * 350) * -1;
                enemyCar.style.top = (i * 150) + "px";
                enemyCar.style.backgroundColor = colorGenerator();

                enemyCar.style.left = Math.round(Math.random() * 350) + "px";
                gamearea.appendChild(enemyCar);
            }

        }


        function isCollide(a, b) {
            aRect = a.getBoundingClientRect();
            bRect = b.getBoundingClientRect();

            return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.left > bRect.right) || (aRect.right < bRect.left))
        }
        function endGame() {
            player.start = false;
            start_screen.classList.remove('hide');
            start_screen.innerHTML = "Game Over" + "<br>" + "Your Score is : " + (player.score + 1) + "<br>" + "Click again to Restart";


        }

        function moveLines() {
            let lines = document.querySelectorAll('.lines');

            lines.forEach(function (item) {
                if (item.j >= 700) {
                    item.j = -50;
                }

                item.j += player.speed;
                item.style.top = item.j + "px";
            })
        }
        function moveEnemy(car) {
            let enemy = document.querySelectorAll('.enemy');

            enemy.forEach(function (item) {

                if (isCollide(car, item)) {
                    console.log("Boom ! Game Over");
                    var audio = new Audio('collision.mp3');
                    audio.play();
                    endGame();
                }

                if (item.j >= 700) {
                    item.j = -300;
                    item.style.left = Math.round(Math.random() * 350) + "px";

                }

                item.j += player.speed;
                item.style.top = item.j + "px";
            })
        }

        function gamePlay() {

            let car = document.querySelector('.car');
            let road = gamearea.getBoundingClientRect();


            // console.log("clicked");

            if (player.start) {

                moveLines();
                moveEnemy(car);

                if (keys.ArrowUp && player.y > 100) { player.y -= player.carspeed }
                if (keys.ArrowDown && player.y < (road.height - 100)) { player.y += player.carspeed }
                if (keys.ArrowLeft && player.x > 7) { player.x -= player.carspeed }
                if (keys.ArrowRight && player.x < (road.width - 77)) { player.x += player.carspeed }

                car.style.top = player.y + "px";
                car.style.left = player.x + "px";

                player.score++;
                score.innerText = "Score : " + player.score;
                window.requestAnimationFrame(gamePlay);

            }
        }
        function colorGenerator() {
            function color() {
                let hexcolor = Math.round(Math.random() * 256).toString(16);

                return ("0" + hexcolor).substr(-2);
            }
            return "#" + color() + color() + color();
        }
