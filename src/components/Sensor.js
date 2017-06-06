import React from 'react';

import { css } from 'glamor';
import { info } from '../styles/forms';

import { RightAlignedLabel, InlineLabel } from './Forms';
import { DeleteButton } from './PageMenu';
import { AnalogPins, DigitalPins } from './Pins';
import SensorPicker from './SensorPicker';

import { sensors } from '../lib/constants';

const styles = {
  container: css({
    position: 'relative',
    padding: 20,
    marginTop: 20,
    borderTop: '1px solid #eee',
    borderRadius: 10,

    '&:hover': {
      background: '#f6f6f6'
    }
  }),

  delButton: css({
    position: 'absolute',
    top: 5,
    right: 5
  }),

  sensorHeading: css({
    fontWeight: 'normal',
    marginTop: 10,
    fontSize: 18
  })
}

export default ({ sensor, sensorIndex, handlers }) => {
  const sensorHandlers = handlers.sensorHandlers(sensorIndex);

  return (
    <div className={styles.container}>
      <div className={styles.delButton}>
        <DeleteButton title='Delete this sensor' width={16} onClick={e => handlers.deleteSensor(sensorIndex)} />
      </div>
      <h5 className={styles.sensorHeading}>{sensors.find(s => s.type === sensor.type).label}</h5>

      {['ldr', 'rain', 'soil', 'thermistor', 'acs712', 'rainGuage', 'analogInput'].includes(sensor.type) && (
        <div>
          <RightAlignedLabel label='Sense pin'>
            <AnalogPins value={sensor.pin} onChange={e => sensorHandlers.setPin(e.target.value)} />
          </RightAlignedLabel>

          <InlineLabel label='Provide power using an external pin'
            info='Recommended. Only powers on the sensor when a reading is required.'>
            <input type='checkbox' checked={sensor.usePowerPin}
              onChange={e => sensorHandlers.usePowerPin(e.target.checked)} />
          </InlineLabel>

          {
            sensor.usePowerPin &&
            <RightAlignedLabel label='Power pin'>
              <DigitalPins value={sensor.powerPin} onChange={e => sensorHandlers.setPowerPin(e.target.value)} />
            </RightAlignedLabel>
          }

          {['ldr', 'rain', 'soil', 'analogInput'].includes(sensor.type) && (
            <div>
              <InlineLabel label='Report values as a percentage'>
                <input type='checkbox' checked={sensor.reportPercentage}
                  onChange={e => sensorHandlers.setReportPercentage(e.target.checked)} />
              </InlineLabel>

              {
                sensor.reportPercentage &&
                <RightAlignedLabel label='Percentage range'>
                  <div className={css({display: 'table'})}>
                    <div className={css({display: 'table-cell', paddingRight: 10})}>
                      <input type='number' min='0' max='1024' pattern='\d*'
                        value={sensor.rangeMin} onChange={e => sensorHandlers.setPercentageMin(e.target.value)} />
                      <p className={info}>Min</p>
                    </div>
                    <div className={css({display: 'table-cell'})}>
                      <input type='number' min='0' max='1024' pattern='\d*'
                        value={sensor.rangeMax} onChange={e => sensorHandlers.setPercentageMax(e.target.value)} />
                      <p className={info}>Max</p>
                    </div>
                  </div>
                  <p className={info}>
                    These values are used as the range for calculating the percentage
                  </p>
                </RightAlignedLabel>
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}
