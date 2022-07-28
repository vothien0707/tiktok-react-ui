import { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCircleNotch,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';

import { wrapper as DropdownWrapper } from '@/components/Dropdown';
import { ClearIcon } from '@/components/Icons';
import AccountItem from '@/components/AccountItem';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      return;
    }

    setShowLoading(true);

    fetch(
      `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
        searchInput,
      )}&type=less`,
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res.data);
        setShowLoading(false);
      })
      .catch(() => {
        setShowLoading(false);
      });
  }, [searchInput]);

  const handleClearInput = () => {
    setSearchInput('');
    setSearchResults([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  console.log(searchInput);

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
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowResult(true)}
        />

        {!!searchInput && !showLoading && (
          <button className={cx('search__clear')} onClick={handleClearInput}>
            <ClearIcon />
          </button>
        )}

        {showLoading && (
          <FontAwesomeIcon
            className={cx('search__loading')}
            icon={faCircleNotch}
          />
        )}

        <button className={cx('search__button')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
