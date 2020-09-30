'use strict'

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
}

//ボタン押下時の処理
assessmentButton.onclick = () => {
    console.log('ボタンが押されました');
    const userName = userNameInput.value;

    if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }

    console.log(userName);


    // TODO 診断結果表示エリアの作成-----------------------

    removeAllChildren(resultDivided);
    //代入されている子の要素を削除する関数（上記定義）をcall
    //子供要素はいれないこと

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);　//document.wirteのhtml記述版のようなもの
    //h3の見出しをつくって、それに中身のテキストを変更できる手段
  　//つまりいままでは、htmlに記載していたものをJS内で定義することができる
  　//JS内で定義できるとロジックを活用して、定義することができる


  　//診断結果内容の表示----------
    const paragraph = document.createElement('p');
    const result = assessment(userName);　//result変数にassesmnet関数（診断結果）のリターン結果を代入
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);


    // TODO ツイートエリアの作成-----------------------------
    removeAllChildren(tweetDivided);

    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';

    //URIとは、Uniform Resource Identifierの略称
    //URLとは、Uniform Resource Locatorの略称

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';

    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);


    tweetDivided.appendChild(anchor);

  };

  //Enterキー入力時の処理の実装
  userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
    }
  };


const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

// const の語源はconstant  不変という意味

function assessment(userName){

    let sumOfCharCode = 0;
    
    //キャラクターコードの和をいれている。チェックサムの計算のようなもの
    for(let i =0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

　　//文字のコード番号の合計を回答の数で割って、添字の数値を求める
    const index = sumOfCharCode % answers.length;　//回答の数で割ることで、どれかに当てはまることになる。
    let result = answers[index];　//上記で作成したanser配列で取得した結果をresultに格納

    result = result.replace(/\{userName\}/g, userName);

    //.replaceは文字の置換が行える
    //    /----/の形式で正規表現を使っている。
    //  \{  と\}　はエスケープシーケンスのため\をつけている。実態は{}

    //やっていることは、userNameという文字列にいれて、それをreslutにかえしている。

    return result;
}



console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('三郎'));



