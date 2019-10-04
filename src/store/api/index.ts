import { Measurement } from "../../types/Metric.types";

const GRAPHQL_ENDPOINT = "https://react.eogresources.com/graphql";

const getMeasurements = (
  metricNames: string[],
  time: number
): Promise<Measurement> => {
  const after = time - 30 * 60 * 1000; // time 30 minutes ago;
  const query = `
    query getMultipleMeasurements($measurements: [MeasurementQuery]){
      getMultipleMeasurements(input: $measurements) {
        metric
        measurements {
          metric
          at
          value
          unit
        }
      }
    }
  `;
  const variables = {
    measurements: metricNames.map(metricName => ({ metricName, after }))
  }
  return fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables })
  }).then((res: Response) => res.json());
};

export default {
  getMeasurements
};
