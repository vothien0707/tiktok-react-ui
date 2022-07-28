import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Image from '@/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <Image className={cx('avatar')} src={data.avatar} alt="acc 1" />
      <div className={cx('info')}>
        <h4 className={cx('info__fullname')}>
          {data.full_name}
          {data.tick && <FontAwesomeIcon icon={faCircleCheck} />}
        </h4>
        <span className={cx('info__nickname')}>{data.nickname}</span>
      </div>
    </Link>
  );
}

export default AccountItem;
