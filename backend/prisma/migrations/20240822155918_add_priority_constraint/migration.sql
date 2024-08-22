-- Add a check constraint to enforce priority between 0 and 10

ALTER TABLE "Event" ADD "CONSTRAINT" "priority_range_check" CHECK (priority >= 0 AND priority <= 10);
