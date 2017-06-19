import React from 'react';

import { css } from 'glamor';
import { info } from '../styles/forms';

import { RightAlignedLabel, InlineLabel } from './Forms';
import { DeleteButton } from './Buttons';
import { AnalogPins, DigitalPins, InterruptPins } from './Pins';
import { confirm } from './Modal';

import { sensors, sensorsByType } from '../lib/constants';

const styles = {
  container: css({
    position: 'relative',
    padding: 20,
    marginTop: 20,
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',

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
};

export default ({ sensor, sensorIndex, handlers }) => {
  const sensorHandlers = handlers.sensorHandlers(sensorIndex);

  const pinProps = { value: sensor.pin, onChange: e => sensorHandlers.setPin(e.target.value) };

  return (
    <div className={styles.container}>
      <div className={styles.delButton}>
        <DeleteButton title='Delete this sensor' width={16} onClick={e => confirm({
            title: 'Delete this sensor?',
            text: 'Are you sure you want to delete this sensor? You can\'t undo this!',
            dangerButtonText: 'Yes, delete this sensor'
        }).then(() => handlers.deleteSensor(sensorIndex))} />
      </div>
      <h5 className={styles.sensorHeading}>{sensors.find(s => s.type === sensor.type).label}</h5>

      {(sensorsByType[sensor.type].pinType === 'analog') && (
        <RightAlignedLabel label='Sense pin'>
          <AnalogPins {...pinProps} />
        </RightAlignedLabel>
      )}

      {(['relay', 'latchingRelay', 'digitalOutput'].includes(sensor.type)) && (
        <RightAlignedLabel label='Output pin'>
          <DigitalPins {...pinProps} />
        </RightAlignedLabel>
      )}

      {(['switch', 'door', 'motion'].includes(sensor.type)) && (
        <RightAlignedLabel label='Sense pin'>
          <InterruptPins {...pinProps} />
        </RightAlignedLabel>
      )}

      {sensor.type === 'hcsr504' && (
        <div>
          <RightAlignedLabel label='Trigger pin'>
            <DigitalPins value={sensor.triggerPin}
              onChange={e => sensorHandlers.setTriggerPin(e.target.value)} />
          </RightAlignedLabel>

          <RightAlignedLabel label='Echo pin'>
            <DigitalPins value={sensor.echoPin}
              onChange={e => sensorHandlers.setEchoPin(e.target.value)} />
          </RightAlignedLabel>
        </div>
      )}

      {('reverse' in sensor) && (
        <InlineLabel label='Reverse the reading from the sensor'
          info='Reverses the reading for the sensor value and its percentage. Eg. 70% becomes 30%.'>
          <input type='checkbox' checked={sensor.reverse}
            onChange={e => sensorHandlers.setReverse(e.target.checked)} />
        </InlineLabel>
      )}

      {('usePowerPin' in sensor) && (
        <div>
          <InlineLabel label='Provide power using an external pin'
            info='Recommended. Only powers the sensor on when a reading is needed.'>
            <input type='checkbox' checked={sensor.usePowerPin}
              onChange={e => sensorHandlers.usePowerPin(e.target.checked)} />
          </InlineLabel>

          {sensor.usePowerPin && (
            <RightAlignedLabel label='Power pin'>
              <DigitalPins value={sensor.powerPin} onChange={e => sensorHandlers.setPowerPin(e.target.value)} />
            </RightAlignedLabel>
          )}
        </div>
      )}

      {('reportPercentage' in sensor) && (
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
                    value={sensor.percentageRangeMin} onChange={e => sensorHandlers.setPercentageMin(e.target.value)} />
                  <p className={info}>Min</p>
                </div>
                <div className={css({display: 'table-cell'})}>
                  <input type='number' min='0' max='1024' pattern='\d*'
                    value={sensor.percentageRangeMax} onChange={e => sensorHandlers.setPercentageMax(e.target.value)} />
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

      {sensor.type === 'acs712' && (
        <RightAlignedLabel label='Current'>
          <select value={sensor.mvPerAmp} onChange={e => sensorHandlers.setMvPerAmp(e.target.value)}>
            <option value={185}>5 Amps</option>
            <option value={100}>20 Amps</option>
            <option value={66}>30 Amps</option>
          </select>
          <p className={info}>
            This depends on the chip or module you are using.
          </p>
        </RightAlignedLabel>
      )}

      {('onValue' in sensor) && (
        <RightAlignedLabel label='Type of output'>
          <select value={sensor.onValue} onChange={e => sensorHandlers.setOnValue(e.target.value)}>
            <option value='high'>Active high</option>
            <option value='low'>Active low</option>
          </select>
        </RightAlignedLabel>
      )}

      {('initialValue' in sensor) && (
        <RightAlignedLabel label='Initial value'>
          <select value={sensor.initialValue} onChange={e => sensorHandlers.setInitialValue(e.target.value)}>
            <option value='high'>High</option>
            <option value='low'>Low</option>
          </select>
          <p className={info}>
            The inital value of the output when the node boots up for the first time.
          </p>
        </RightAlignedLabel>
      )}

      {('autoTurnOff' in sensor) && (
        <div>
          <InlineLabel label='Auto turn-off' info='When enabled, the output turns off automatically some time after turning on.'>
            <input type='checkbox' checked={sensor.autoTurnOff}
              onChange={e => sensorHandlers.setAutoTurnOff(e.target.checked)} />
          </InlineLabel>

          {sensor.autoTurnOff && (
            <RightAlignedLabel label='Turn off after'>
              <input type='number' pattern='\d*' min={1} max={32767}
                className={css({marginRight: 10})}
                value={sensor.turnOffTime} onChange={e => sensorHandlers.setTurnOffTime(parseInt(e.target.value, 10))} />
              minute{sensor.turnOffTime === 1?'':'s'}
            </RightAlignedLabel>
          )}
        </div>
      )}

      {('interruptMode' in sensor) && (
        <RightAlignedLabel label='Interrupt mode'>
          <select value={sensor.interruptMode} onChange={e => sensorHandlers.setInterruptMode(e.target.value)}>
            <option value='change'>Change</option>
            <option value='rising'>Rising</option>
            <option value='falling'>Falling</option>
          </select>
          <p className={info}>
            The pulse edge that the interrupt should be triggered on
          </p>
        </RightAlignedLabel>
      )}

      {('debounceTime' in sensor) && (
        <RightAlignedLabel label='Debounce time'>
          <input type='number' pattern='\d*' min={0} max={300}
            value={sensor.debounceTime} className={css({marginRight: 5})}
            onChange={e => sensorHandlers.setDebounceTime(parseInt(e.target.value, 10))} />
          ms
          <p className={info}>
            Number of milliseconds to wait before reading the input
          </p>
        </RightAlignedLabel>
      )}

      {('normalValue' in sensor) && (
        <RightAlignedLabel label='Normal value'>
          <select value={sensor.normalValue}
            onChange={e => sensorHandlers.setNormalValue(e.target.value)}>
            <option value='high'>High</option>
            <option value='low'>Low</option>
          </select>
          <p className={info}>
            The normal un-triggered value of the input. For eg. this is high if you use a pull-up resistor.
          </p>
        </RightAlignedLabel>
      )}
    </div>
  );
}
