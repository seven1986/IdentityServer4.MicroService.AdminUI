export class ListTable {
  // pager
  public q: any = {
    pageIndex: 1,
    pageSize: 10,
    orderby: '',
    asc: false,
  };

  // selectRows
  public selectedRows: any[] = [];

  public _allChecked = false;

  public _indeterminate = false;

  public _loading: boolean = false;

  public expandForm: boolean = false;

  // filter 
  public f: any = {};

  public vm: any = { data: [] };

  public _sort = (k, evt) => {
    if (evt == null) {
      this.q.orderby = '';
      this.q.asc = false;
    }
    else {
      this.q.orderby = k;
      this.q.asc = evt == 'descend' ? false : true;
    }
    this.getData();
  }

  public _checkAll(value) {
    this.vm.data.forEach(i => {
      if (!i.disabled) i.checked = value;
    });

    this._refreshStatus();
  }

  public _refreshStatus() {
    const allChecked = this.vm.data.every(value => value.checked === true);
    const allUnChecked = this.vm.data.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this.selectedRows = this.vm.data.filter(value => value.checked);
  }

  public getData() { }

}
