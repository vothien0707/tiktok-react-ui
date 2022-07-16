import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avatar')}
        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/51faeb2beb46a239fccc193230a4259b~c5_300x300.webp?x-expires=1658134800&x-signature=M4tnD640%2Br9CBVxM3P%2BFxmnJnk0%3D"
        alt="acc 1"
      ></img>
      <div className={cx('info')}>
        <h4 className={cx('info__name')}>
          Accout 1
          <FontAwesomeIcon icon={faCircleCheck} />
        </h4>
        <span className={cx('info__id')}>Accout1</span>
      </div>
    </div>
  );
}

export default AccountItem;
