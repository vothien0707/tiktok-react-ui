import { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCircleNotch,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';

import { useDebounce } from '@/hooks';
import { wrapper as DropdownWrapper } from '@/components/Dropdown';
import AccountItem from '@/components/AccountItem';
import * as searchServices from '@/apiServices/searchServices';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const debounce = useDebounce(searchInput, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResults([]);
      return;
    }

    const fecthApi = async () => {
      setShowLoading(true);

      const result = await searchServices.search(debounce);
      setSearchResults(result);

      setShowLoading(false);
    };

    fecthApi();
  }, [debounce]);

  const handleClearInput = () => {
    setSearchInput('');
    setSearchResults([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChangeInput = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchInput(searchValue);
    }
  };

  return (
    <HeadlessTippy
      interactive
      visible={showResult && searchResults.length > 0}
      render={(attrs) => (
        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
          <DropdownWrapper>
            <h4 className={cx('search-result__title')}>Accounts</h4>
            {searchResults.map((searchResult) => (
              <AccountItem key={searchResult.id} data={searchResult} />
            ))}
          </DropdownWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchInput}
          placeholder="Search accounts and videos"
          spellCheck={false}
          onChange={handleChangeInput}
          onFocus={() => setShowResult(true)}
        />

        {!!searchInput && !showLoading && (
          <button className={cx('search__clear')} onClick={handleClearInput}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {showLoading && (
          <FontAwesomeIcon
            className={cx('search__loading')}
            icon={faCircleNotch}
          />
        )}

        <button
          className={cx('search__submit')}
          onMouseDown={(e) => e.preventDefault()}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
