'use client';
import { Next13ProgressBar } from 'next13-progressbar';
const NextNProgressClient = () => {
    return(
      <>
      <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
      </>
      )
};

export default NextNProgressClient;