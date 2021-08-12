import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from 'src/app/models/user.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { DialogData } from '../room-list.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  channelForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.channelForm = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required]),
      pass: new FormControl(this.data.pass),
    });

    const userId: string | null = localStorage.getItem('userId');

    if (userId) {
      data.userId = userId;
    } else {
      data.userId = 'null';
    }
  }

  ngOnInit(): void {}

  get name() {
    return this.channelForm.get('name');
  }

  get pass() {
    return this.channelForm.get('pass');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
