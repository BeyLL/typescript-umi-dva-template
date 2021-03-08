import React from 'react'
import { PaginationProps } from 'antd/es/pagination'
interface ActionProps {
    type: string;
    payload: {
        pageNum: number;
        pageSize: number
    }
}



export class Pagination {
    private current: number;
    private pageSize: number;
    private total: number;
    private dispatch: (Object) => void;
    private dispatchType: string;
    private params: Object;
    private showSizeChanger: boolean;
    private showQuickJumper: boolean;
    private pageSizeOptions: string[];
    private size: string;
    private changeRequest: boolean;
    private onShowSizeChange: (current: number, size: number) => void;
    private showTotal: (total: number, range: [number, number]) => React.ReactNode;
    private onChange: (page: number, pageSize: number) => void;

    constructor(pages) {
        this.current = (pages && pages.current) || 1;
        this.pageSize = (pages && pages.pageSize) || 10;
        this.total = (pages && pages.total) || 0;
        this.dispatch = (pages && pages.dispatch) || null;
        this.dispatchType = (pages && pages.dispatchType) || '';
        this.params = (pages && pages.params) || {};
        this.showSizeChanger = (pages && pages.showSizeChanger) || false;
        this.showQuickJumper = (pages && pages.showQuickJumper) || false;
        this.changeRequest = pages && typeof pages.request !== 'undefined' ? pages.request : true;
        this.pageSizeOptions = (pages && pages.pageSizeOptions) || ['10', '20', '30', '40', '50'];
        this.size = 'middle';

        this.showTotal = function (total: number, range: number[]) {
            return `第${range[0]}-${range[1]}条  共 ${total} 条`;
        };

        this.onShowSizeChange = function (current: number, size: number) {
            this.current = current;
            this.pageSize = size;
            if (!this.changeRequest) return;
            const action: ActionProps = {
                type: this.dispatchType,
                payload: {
                    pageNum: 1,
                    pageSize: size,
                },
            };

            Object.assign(action.payload, this.params);

            this.dispatch(action);
        };

        this.onChange = function (page: number, pageSize: number) {
            this.current = page;
            this.pageSize = pageSize;
            if (!this.changeRequest) return;
            const action: ActionProps = {
                type: this.dispatchType,
                payload: {
                    pageNum: page,
                    pageSize: pageSize,
                },
            };

            Object.assign(action.payload, this.params);
            this.dispatch(action);
        };
    }

}
