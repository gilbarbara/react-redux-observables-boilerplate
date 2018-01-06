import {
  hideAlert,
  showAlert,
} from 'actions/app';

describe('actions/app', () => {
  describe('hideAlert', () => {
    it('should return an action', () => {
      expect(hideAlert('ABC1')).toEqual({
        type: 'HIDE_ALERT',
        payload: { id: 'ABC1' },
      });
    });
  });

  describe('showAlert', () => {
    it('should return an action', () => {
      expect(showAlert('Alright!', { type: 'success', id: 'ABC1' })).toEqual({
        type: 'SHOW_ALERT',
        payload: {
          id: 'ABC1',
          message: 'Alright!',
          position: 'bottom-right',
          type: 'success',
          timeout: 5,
        },
      });

      expect(showAlert('ERROR!', { type: 'error', id: 'ABC2', timeout: 0, position: 'top' })).toEqual({
        type: 'SHOW_ALERT',
        payload: {
          id: 'ABC2',
          message: 'ERROR!',
          position: 'top',
          type: 'error',
          timeout: 0,
        },
      });
    });
  });
});
