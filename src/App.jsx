import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const SORT_BY_LENGTH = 'length';
  const SORT_BY_ALPHABET = 'alphabet';

  const [sortType, setSortType] = useState('');
  const [reverse, setReverse] = useState(false);

  function getPrepearedGoods(goods, { sortType: localSortType, reverse: localReverse }) {
    const prepearedGoods = [...goods];

    if (localSortType) {
      prepearedGoods.sort((good1, good2) => {
        switch (localSortType) {
          case SORT_BY_LENGTH:
            return good1[SORT_BY_LENGTH] - good2[SORT_BY_LENGTH];

          case SORT_BY_ALPHABET:
            return good1.localeCompare(good2);

          default:
            return 0;
        }
      });

      if (localReverse) {
        prepearedGoods.reverse();
      }

      return prepearedGoods;
    }

    if (localReverse) {
      prepearedGoods.reverse();
    }

    return prepearedGoods;
  }

  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortType,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortType(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse !== true,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(reverse === false && sortType === '') === false && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
