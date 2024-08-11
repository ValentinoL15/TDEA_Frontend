import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.page.html',
  styleUrls: ['./confirm-code.page.scss'],
})
export class ConfirmCodePage implements OnInit {

  code: string[] = ['', '', '', ''];
  parametroLargo: string | null = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private notifyfService: NotifyService) { }

  ngOnInit() {
    this.parametroLargo = this.route.snapshot.paramMap.get('id');
  }

  onInputChange(event: any, currentIndex: number) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    this.code[currentIndex] = inputValue;

    // Filtrar y permitir solo caracteres numéricos
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Actualizar el valor del campo de entrada con caracteres numéricos
    inputElement.value = inputValue;

    if (inputValue.length === 1) {
        // Enfocar el siguiente campo de entrada
        const nextIndex = currentIndex + 1;
        if (nextIndex < 4) {
            const nextInput = document.querySelector(`input:nth-child(${nextIndex + 1})`) as HTMLInputElement;
            if (nextInput) {
                nextInput.focus();
            }
        }
    }
  }

  onKeyDown(event: any, currentIndex: number) {
    setTimeout(() => {
      if (event.key === 'Backspace' && currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        const prevInput = document.querySelector(
          `input:nth-child(${prevIndex + 1})`
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }, 50)
  }

  submitCode() {
    const code = this.code.join(',');
    const result = parseInt(code.split(',').join(''), 10);
    
    this.authService.verifyAccountCode(this.parametroLargo, result).subscribe({
      next: (res: any) => {
        this.notifyfService.success(res.message);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.notifyfService.error(err.error.message);
      }
    })
  }

}
