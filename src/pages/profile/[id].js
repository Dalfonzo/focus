import { supabase } from '../../lib/supabaseClient'
import BackBtn from '../../components/back-btn'
import ErrorMessage from '../../components/error-message'
import {
  dateWithtimeFormatter,
  secondsToMinutes,
  onlyDateFormatter,
} from '../../utils'

export default function Profile({ data, error }) {
  return (
    <>
      <BackBtn />
      {error ? (
        <ErrorMessage />
      ) : (
        <div className="w-full max-w-lg mx-auto bg-white-10 z-[1] relative p-[2rem] lg:p-[3rem] shadow-container rounded-[10px]">
          <div className="shadow-container rounded-[10px] p-4 my-2">
            <p className="block mb-4 text-xs font-bold tracking-wide underline uppercase">
              Last Pomodoro
            </p>
            <p className="ml-auto w-fit">
              {data.latest_pomodoro
                ? onlyDateFormatter(data.latest_pomodoro)
                : '-'}
            </p>
          </div>
          <div className="shadow-container rounded-[10px] p-4 my-2">
            <p className="block mb-4 text-xs font-bold tracking-wide underline uppercase">
              Total accumulated time
            </p>
            <p className="ml-auto w-fit">
              {secondsToMinutes(data.accumulated_time)} min
            </p>
          </div>
          <div className="shadow-container rounded-[10px] p-4 my-2">
            <p className="block mb-4 text-xs font-bold tracking-wide underline uppercase">
              Total pomodoros completed
            </p>
            <p className="ml-auto w-fit ">{data.accumulated_pomodoros}</p>
          </div>
          <div className="shadow-container rounded-[10px] p-4 my-2">
            <p className="block mb-4 text-xs font-bold tracking-wide underline uppercase">
              History
            </p>
            <span className="text-sm text-fuchsia">
              Only the last 20 are shown
            </span>
            {data.user_history ? (
              <ul>
                {data.user_history.map((element) => {
                  return (
                    <li key={element.id} className="flex p-1 justify-evenly ">
                      <p className="p-1 ">
                        Date: {dateWithtimeFormatter(element.created_at)}
                      </p>
                      <p className="p-1">-</p>
                      <p className="p-1">
                        Duration: {secondsToMinutes(element.duration)} min
                      </p>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="mt-2">No items to show</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { id: userId } = params

  const { data, error } = await supabase.rpc('get_report_data', {
    p_user_id: userId,
  })

  return {
    props: {
      data,
      error,
    },
  }
}
