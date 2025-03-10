import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ConfirmModalComponent {
  @Input() title: string = 'Onay';
  @Input() message: string = 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?';

  constructor(public modal: NgbActiveModal) {}

  confirm() {
    this.modal.close(true);
  }

  cancel() {
    this.modal.dismiss(false);
  }
} 