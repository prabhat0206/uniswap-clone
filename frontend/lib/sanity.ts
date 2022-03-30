import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "8ffq4bfu",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skospwrCA3LlbqTfoblJ7CtsKPwckvGuFdTB8x5YklbEKIEtMFe47rKEZKH6K6oiYEuDGfDxg2VU61jy8vLhbkfaRm5NZB79dHNfYH58GcH8Qe5n8RokOOKx0eAZhIEv7jvXJ7S0xOPDM9zas2o1uxxny5feF5Vv4vOtdXEn6RpmFyubuLIF",
  useCdn: false,
});
