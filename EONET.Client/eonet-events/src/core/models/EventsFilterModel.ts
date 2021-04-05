export class EventsFilterModel {
    lastDaysFilter?: number;
    statusFilter?: "open" | "closed";
    categoryId?: number;
    sorting?: "date" | "status" | "category";
}