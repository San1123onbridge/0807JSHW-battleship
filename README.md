# 0807JSHW-battleship
0806

使用教材內給的img和css刻一個battleship的猜網格遊戲。
練習在物件裡設定變數、陣列和方法。透過函式在遊戲開始前隨機決定縱向或橫向的戰艦三艘並放入陣列內，點擊右下按鈕決定目標或按下enter取代點擊按鈕。

思路先寫出左上的view物件用方法控制出現hit和miss的訊息。
再以model物件作為模型設定版面大小、船艦數量、船艦大小(length)、擊沉數、開場隨機的船艦陣列和數個控制遊戲的方法。

使用fire方法去篩選使用者是否命中隨機決定的位置再提示訊息，使用indexOf(guess)並回傳大於-1的值判定是否命中，有則回傳true並提示訊息，否則回傳false並提示missed。

使用isSunk方法回傳船是否被擊沉。

以generateShipLocation控制generateShip和collision兩個方法去做出網頁一開始決定的隨機船艦陣列。generateShip負責做出隨機的水平或垂直船艦，collision負責檢測是否有重複位置的船艦。

完成模型後，寫出compare函式去判定使用者是否輸入正確的位置訊息，先用charAt()轉換英文字符再以isNaN()做判斷，為否再判斷兩數字是否超出版格(board.length)，後回傳位置，否則回傳null。

以controller物件控制猜測數和使用函式compare判斷使用者輸入。

後續使用函式handleFireButton抓取使用者輸入再放入controller，輸入後將輸入欄清空。使用init控制fire按鈕事件並將enter設為keypress事件即完成。

![image](https://github.com/San1123onbridge/0807JSHW-battleship/blob/master/0814.PNG)
