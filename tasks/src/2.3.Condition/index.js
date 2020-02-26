import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    Не выделяя дополнительных методов
    1. Сделай так, чтобы renderPosts возвращал:
      - div с классом emptyPosts и текстом "Нет откликов",
        если posts пуст: <div className="emptyPosts">Нет откликов</div>
      - div с классом singlePost и текстом "Единственный отклик",
        если в posts ровно 1 элемент: <div className="singlePost">Единственный отклик</div>
      - div с классом posts в остальных случаях: <div className="posts">Отклики в количестве {posts.length}</div>
    2. Если name лота пустое или неопределено, то вместо него должна появляться надпись '<Неизвестный предмет>'
    3. Если description лота пустое или неопределено, то тэг с классом lotDescription должен отсутствовать
    4. Если у лота нет тэгов, то div с классом lotTags должен отсутствовать
 */

function renderPosts(posts) {
  //<div className="emptyPosts">Нет откликов</div>
  //<div className="singlePost">Единственный отклик</div>
  const attrs = { name: '', message: '' };
  switch (posts.length) {
    case 0:
      attrs.name = 'emptyPosts';
      attrs.message = 'Нет откликов';
      break;
    case 1:
      attrs.name = 'singlePost';
      attrs.message = 'Единственный отклик';
      break;
    default:
      attrs.name = 'posts';
      attrs.message = '' + posts.length;
      break;
  }
  return (<div className={attrs.name}>Отклики в количестве {attrs.message}</div>);
}

function renderLot(name, description, tags) {
  const descriptHtml = description ?
    (<div className="lotDescription">{description}</div>) :
    '';
  const tagsHtml = tags.length ? renderTags(tags) : '';
  return (
    <div className="lot">
      <div className="lotName">{name ? name : '<Неизвестный предмет>'}</div>
      {descriptHtml}
      {tagsHtml}
    </div>
  );
}

function renderTags(tags) {
  const content = tags.join(', ');
  return <div className="lotTags">{content}</div>;
}

ReactDom.render(
  <div>
    <div className="page">
      {renderLot('', 'красный, красивый, твой!', [])}
      {renderPosts([])}
    </div>
    <div className="page">
      {renderLot('Пирожок с капустой', undefined, ['#свежий', '#ручнаяРабота'])}
      {renderPosts(['Тут ровно один отклик'])}
    </div>
    <div className="page">
      {renderLot('', '', ['#большой', '#Яркий'])}
      {renderPosts(['Класс!', 'Хочу еще!', 'Отстой'])}
    </div>
  </div>,
  document.getElementById('app')
);
