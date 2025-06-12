import { useState, useRef, useEffect } from "react";

export const Route = createFileRoute({
  component: JokePage,
});

const API_URL = "https://api.chucknorris.io/jokes/random?category=dev";
const FETCH_DELAY = 15;

function JokePage() {
  const [lastFetched, setLastFetched] = useState<string>("");
  const [jokes, setJokes] = useState<string[]>([]);

  const [countdown, setCountdown] = useState<number>(FETCH_DELAY);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    fetchJoke();

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchJoke();
          return FETCH_DELAY;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  async function fetchJoke() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setJokes((jokes) => [data.value, ...jokes]);

      setLastFetched(new Date().toLocaleString());
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJokes((jokes) => [
        "Failed to fetch joke. Please check your connection.",
        ...jokes,
      ]);
    }
  }

  return (
    <>
      <title>Peplink Task - Jokes</title>
      <div className="flex-grow flex justify-center items-center p-4 flex-col">
        <header className="text-center mb-4 flex items-center flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chuck Norris Dev Jokes
          </h1>
          <div className="flex flex-col gap-1 items-center w-max">
            <p className="text-gray-600">
              New Joke Every {FETCH_DELAY} seconds!
            </p>
            <progress
              className="h-1 w-full"
              max={FETCH_DELAY}
              value={countdown}
            ></progress>
          </div>
          {lastFetched && (
            <div className="text-sm text-gray-500 mt-6">
              <span className="font-medium">Last updated:</span> {lastFetched}
            </div>
          )}
        </header>

        <main className="w-full h-full flex flex-col items-center">
          <ul className="h-[40rem] md:h-[30rem] w-full md:w-1/2 overflow-y-auto flex-col bg-white rounded-sm border-2 border-gray-400 p-6">
            {jokes.map((joke, i) => (
              <li
                key={i}
                className="first:bg-green-300 bg-gray-200 rounded-md p-4 mb-4 text-center text-lg"
              >
                <p className="text-gray-800 leading-relaxed">{joke}</p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
