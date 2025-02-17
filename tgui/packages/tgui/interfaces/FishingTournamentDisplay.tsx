import { useBackend } from '../backend';
import { Button, LabeledList, NumberInput, TimeDisplay } from '../components';
import { Window } from '../layouts';

type FishingTournamentDisplayData = {
  tournament_going_on: boolean;
  duration: number;
  timeleft: number;
};

export const FishingTournamentDisplay = (props, context) => {
  const { act, data } = useBackend<FishingTournamentDisplayData>(context);
  const { tournament_going_on, duration, timeleft } = data;

  return (
    <Window>
      <Window.Content>
        <LabeledList>
          <LabeledList.Item label="Status">
            {tournament_going_on ? 'Underway' : 'Stopped'}
          </LabeledList.Item>
          {!!tournament_going_on && (
            <>
              <LabeledList.Item label="Time left">
                <TimeDisplay value={timeleft} />
              </LabeledList.Item>
              <LabeledList.Item label="Actions">
                <Button onClick={() => act('end')}>Stop Tournament Now</Button>
              </LabeledList.Item>
            </>
          )}
        </LabeledList>

        {!tournament_going_on && (
          <>
            <LabeledList>
              <LabeledList.Item label="Tournament Duration">
                <NumberInput
                  width="200px"
                  value={duration}
                  unit="ds"
                  minValue={0}
                  onChange={(e, value) =>
                    act('set_duration', {
                      duration: value,
                    })
                  }
                />
              </LabeledList.Item>
            </LabeledList>
            <Button onClick={() => act('start')}>Start Tournament</Button>
          </>
        )}
      </Window.Content>
    </Window>
  );
};
